// src/utils/evaluateInsights.ts

/**
 * This file compares latest sensor readings with research article rules.
 * Output:
 * - global alerts for Alerts page
 * - per-article alerts + recommendations for Research page
 */

import type { ResearchArticle, SoilMetric } from "../pages/research/researchData";
import { DEFAULT_OK_TEXT, METRIC_LABELS } from "./constants";
import { sortBySeverity, uniqueStrings } from "./helpers";

/**
 * Latest readings that the rules engine understands.
 * Includes extra UI metrics so the same object can be reused
 * across pages even if not all metrics are used in article rules.
 */
export type SoilReadings = Partial<Record<SoilMetric, number>> & {
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
};

export type AlertSeverity = "info" | "warning" | "critical";

/**
 * One alert item that can be shown globally and under each article.
 */
export interface SoilAlert {
  id: string;
  metric: SoilMetric;
  title: string;
  severity: AlertSeverity;
  value: number;
  sourceArticleId: number;
  sourceArticleTitle: string;
  recommendation?: string;
}

/**
 * Grouped result for one article.
 */
export interface ArticleInsights {
  alerts: SoilAlert[];
  recommendations: string[];
}

/**
 * Final result returned by the rule engine.
 */
export interface InsightsResult {
  alerts: SoilAlert[];
  byArticle: Record<number, ArticleInsights>;
}

function getMetricLabel(metric: SoilMetric, customLabel?: string): string {
  return customLabel ?? METRIC_LABELS[metric] ?? metric.toUpperCase();
}

function createAlert(params: {
  article: ResearchArticle;
  metric: SoilMetric;
  title: string;
  severity: AlertSeverity;
  value: number;
  recommendation?: string;
  suffix: string;
}): SoilAlert {
  const { article, metric, title, severity, value, recommendation, suffix } = params;

  return {
    id: `${article.id}-${metric}-${suffix}`,
    metric,
    title,
    severity,
    value,
    sourceArticleId: article.id,
    sourceArticleTitle: article.title,
    recommendation,
  };
}

/**
 * Main function: compare readings against each article's rules.
 */
export function evaluateInsights(
  latest: SoilReadings | null,
  articles: ResearchArticle[]
): InsightsResult {
  const empty: InsightsResult = { alerts: [], byArticle: {} };
  if (!latest) return empty;

  const byArticle: Record<number, ArticleInsights> = {};
  const globalAlerts: SoilAlert[] = [];

  const ensureBucket = (articleId: number): ArticleInsights => {
    if (!byArticle[articleId]) {
      byArticle[articleId] = { alerts: [], recommendations: [] };
    }
    return byArticle[articleId];
  };

  for (const article of articles) {
    const bucket = ensureBucket(article.id);

    if (article.staticRecommendations?.length) {
      bucket.recommendations.push(...article.staticRecommendations);
    }

    const rules = article.rules ?? [];

    for (const rule of rules) {
      const value = latest[rule.metric];
      if (value == null) continue;

      const metricLabel = getMetricLabel(rule.metric, rule.metricLabel);

      /**
       * A) If rule has bands, bands take priority.
       * This prevents duplicate alerts from both bands and min/max.
       */
      if (rule.bands?.length) {
        const matchedBand = rule.bands.find((band) => {
          const minOk = band.min == null || value >= band.min;
          const maxOk = band.max == null || value <= band.max;
          return minOk && maxOk;
        });

        if (matchedBand) {
          const severity: AlertSeverity =
            matchedBand.severity ?? rule.severity ?? "warning";

          const title = `${metricLabel}: ${matchedBand.name}`;
          const recommendation = matchedBand.recommendation;

          const alert = createAlert({
            article,
            metric: rule.metric,
            title,
            severity,
            value,
            recommendation,
            suffix: `band-${matchedBand.name}`,
          });

          if (severity === "info") {
            if (recommendation) {
              bucket.recommendations.push(recommendation);
            }
          } else {
            bucket.alerts.push(alert);
            globalAlerts.push(alert);

            if (recommendation) {
              bucket.recommendations.push(recommendation);
            }
          }

          continue;
        }
      }

      /**
       * B) Otherwise use min/max threshold rules.
       */
      const isLow = rule.min != null && value < rule.min;
      const isHigh = rule.max != null && value > rule.max;

      if (!isLow && !isHigh) continue;

      const title = isLow
        ? `${metricLabel} below recommended`
        : `${metricLabel} above recommended`;

      const recommendation = isLow ? rule.recommendLow : rule.recommendHigh;

      const alert = createAlert({
        article,
        metric: rule.metric,
        title,
        severity: rule.severity ?? "warning",
        value,
        recommendation,
        suffix: isLow ? "low" : "high",
      });

      bucket.alerts.push(alert);
      globalAlerts.push(alert);

      if (recommendation) {
        bucket.recommendations.push(recommendation);
      }
    }

    bucket.alerts = sortBySeverity(bucket.alerts);
    bucket.recommendations = uniqueStrings(bucket.recommendations);
  }

  return {
    alerts: sortBySeverity(globalAlerts),
    byArticle,
  };
}

/**
 * Optional helper:
 * returns true if there is at least one active alert.
 */
export function hasActiveAlerts(result: InsightsResult): boolean {
  return result.alerts.length > 0;
}

/**
 * Optional helper:
 * get per-article insight safely.
 */
export function getArticleInsights(
  result: InsightsResult,
  articleId: number
): ArticleInsights {
  return (
    result.byArticle[articleId] ?? {
      alerts: [],
      recommendations: [DEFAULT_OK_TEXT],
    }
  );
}