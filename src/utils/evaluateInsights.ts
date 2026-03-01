// src/utils/evaluateInsights.ts
/**
 * This file compares latest sensor readings (from Readings page)
 * and research article rules (from researchData.ts)
 * Output: global list of alerts for Alerts page and
 * per-article alerts + recommendations for Research page
 */

import type { ResearchArticle, SoilMetric } from "../pages/research/researchData";

/**
 *latest readings that the rules engine understands
 * we only include metrics that appear in ArticleRule.metric (SoilMetric)
 * NOTE: nitrogen/phosphorus/potassium are UI metrics right now (not in rules),
 * but we keep them here so Readings page can store them in the same object
 */
export type SoilReadings = Partial<Record<SoilMetric, number>> & {
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
};

export type AlertSeverity = "info" | "warning" | "critical";

/**
 * One alert item that can be shown in Alerts page (global)
 * and also under a specific article in Research page
 */
export interface SoilAlert {
  id: string;
  metric: SoilMetric;
  title: string;
  severity: AlertSeverity;
  value: number;

  //which research article produced this alert?
  sourceArticleId: number;
  sourceArticleTitle: string;

  //what should user do?
  recommendation?: string;
}

/**
 * Grouped insight for one article
 */
export interface ArticleInsights {
  alerts: SoilAlert[];
  recommendations: string[];
}

/**
 *whole result from evaluation
 */
export interface InsightsResult {
  alerts: SoilAlert[]; // global list
  byArticle: Record<number, ArticleInsights>; // per article id
}

/**
 *Main function:compare readings against each article's rules
 */
export function evaluateInsights(
  latest: SoilReadings | null,
  articles: ResearchArticle[]
): InsightsResult {
  const empty: InsightsResult = { alerts: [], byArticle: {} };
  if (!latest) return empty;

  const byArticle: InsightsResult["byArticle"] = {};
  const globalAlerts: SoilAlert[] = [];

  //helper: create article bucket if missing
  const ensureBucket = (articleId: number) => {
    if (!byArticle[articleId]) {
      byArticle[articleId] = { alerts: [], recommendations: [] };
    }
    return byArticle[articleId];
  };

  for (const article of articles) {
    const bucket = ensureBucket(article.id);

    // 1)always attach static recommendations (always visible under article)
    if (article.staticRecommendations?.length) {
      bucket.recommendations.push(...article.staticRecommendations);
    }

    // 2) evaluate rules (if any) with current sensor readings
    const rules = article.rules ?? [];
    for (const rule of rules) {
      const value = latest[rule.metric];

      //if user doesnt have this metric reading, skip
      if (value == null) continue;

      // A) if rule has bands, they take priority (prevents duplicate alerts)
      if (rule.bands && rule.bands.length > 0) {
        const band = rule.bands.find((b) => {
          const minOk = b.min == null || value >= b.min;
          const maxOk = b.max == null || value <= b.max;
          return minOk && maxOk;
        });

        if (band) {
          const severity: AlertSeverity =
            band.severity ?? rule.severity ?? "warning";

          const metricLabel = rule.metricLabel ?? rule.metric.toUpperCase();
          const title = `${metricLabel}: ${band.name}`;

          //build alert object
          const alert: SoilAlert = {
            id: `${article.id}-${rule.metric}-band-${band.name}`,
            metric: rule.metric,
            title,
            severity,
            value,
            sourceArticleId: article.id,
            sourceArticleTitle: article.title,
            recommendation: band.recommendation,
          };

          //if band severity is info -> show only as recommendation
          if (severity === "info") {
            if (band.recommendation) bucket.recommendations.push(band.recommendation);
          } else {
            bucket.alerts.push(alert);
            globalAlerts.push(alert);
            if (band.recommendation) bucket.recommendations.push(band.recommendation);
          }

          continue; // band matched => do not apply min/max
        }
      }

      //B)otherwise apply min/max threshold check
      const isLow = rule.min != null && value < rule.min;
      const isHigh = rule.max != null && value > rule.max;
      if (!isLow && !isHigh) continue;

      const metricLabel = rule.metricLabel ?? rule.metric.toUpperCase();
      const title = isLow
        ? `${metricLabel} below recommended`
        : `${metricLabel} above recommended`;

      const recommendation = isLow ? rule.recommendLow : rule.recommendHigh;

      const alert: SoilAlert = {
        id: `${article.id}-${rule.metric}-${isLow ? "low" : "high"}`,
        metric: rule.metric,
        title,
        severity: rule.severity ?? "warning",
        value,
        sourceArticleId: article.id,
        sourceArticleTitle: article.title,
        recommendation,
      };

      bucket.alerts.push(alert);
      globalAlerts.push(alert);

      if (recommendation) bucket.recommendations.push(recommendation);
    }

    //remove duplicate recommendations inside this article bucket
    const seen = new Set<string>();
    bucket.recommendations = bucket.recommendations.filter((t) => {
      const key = t.trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return { alerts: globalAlerts, byArticle };
}