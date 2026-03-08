// src/pages/research/Research.tsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Research.css";
import { RESEARCH_DATA } from "./researchData";
import { useSoilInsights } from "../../context/SoilInsightsContext";
import type { SoilAlert } from "../../utils/evaluateInsights";
import { includesText } from "../../utils/helpers";
import { formatMetricValue } from "../../utils/formatters";
import { METRIC_LABELS } from "../../utils/constants";
import type { SoilMetric } from "./researchData";

export default function Research() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const { insights } = useSoilInsights();

  const tags = useMemo(() => {
    const allTags = RESEARCH_DATA.flatMap((article) => article.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, []);

  const filtered = useMemo(() => {
    return RESEARCH_DATA.filter((article) => {
      const matchSearch =
        includesText(article.title, search) ||
        includesText(article.summary, search);

      const matchTag =
        selectedTag === "all" || article.tags.includes(selectedTag);

      return matchSearch && matchTag;
    });
  }, [search, selectedTag]);

  return (
    <div className="research-container">
      <h1>Research</h1>

      {/* Popular crops in Azerbaijan */}
      <section className="crop-list-section">
        <h2 className="crop-list-title">Crops commonly grown in Azerbaijan</h2>
        <p className="crop-list-text">
          Click a crop to open a simple page with basic tips on how to grow it.
        </p>
        <div className="crop-list-row">
          <Link to="/crops/wheat" className="crop-pill">
            Wheat
          </Link>
          <Link to="/crops/potato" className="crop-pill">
            Potato
          </Link>
          <Link to="/crops/tomato" className="crop-pill">
            Tomato
          </Link>
          <Link to="/crops/grape" className="crop-pill">
            Grapes
          </Link>
          <Link to="/crops/barley" className="crop-pill">
            Barley
          </Link>
        </div>
      </section>

      <input
        className="search-input"
        placeholder="Search title or summary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {filtered.map((article) => {
        const articleInsights = insights.byArticle[article.id];
        const alerts = articleInsights?.alerts ?? [];
        const recommendations = articleInsights?.recommendations ?? [];

        return (
          <div className="research-card" key={article.id}>
            <h2>
              Article {article.id} (PDF) – {article.title}
            </h2>

            <p>
              Source:{" "}
              <a href={article.source} target="_blank" rel="noreferrer">
                Open PDF
              </a>
            </p>

            <p>{article.summary}</p>

            <div className="tag-container">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <h3 style={{ marginBottom: 6 }}>Alerts / Findings</h3>

              {alerts.length === 0 ? (
                <p style={{ opacity: 0.8 }}>
                  ✅ No alerts from this article based on current readings.
                </p>
              ) : (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {alerts.map((alert) => (
                    <ResearchAlertLine key={alert.id} alert={alert} />
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <h3 style={{ marginBottom: 6 }}>Recommendations</h3>

              {recommendations.length === 0 ? (
                <p style={{ opacity: 0.8 }}>No recommendations available.</p>
              ) : (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {recommendations.map((recommendation, index) => (
                    <li key={`${article.id}-rec-${index}`}>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Small helper component for an alert line
 * keeps Research.tsx cleaner and consistent.
 */
function ResearchAlertLine({ alert }: { alert: SoilAlert }) {
  const icon =
    alert.severity === "critical"
      ? "🟥"
      : alert.severity === "warning"
        ? "🟧"
        : "🟦";

  const metricLabel = getMetricDisplayLabel(alert.metric);
  const metricValue = formatMetricValue(alert.metric, alert.value);

  return (
    <li>
      {icon} <b>{alert.title}</b> — {metricLabel}: {metricValue}
      {alert.recommendation ? (
        <span style={{ opacity: 0.85 }}> · {alert.recommendation}</span>
      ) : null}
    </li>
  );
}

function getMetricDisplayLabel(metric: SoilMetric): string {
  if (metric === "ec") return "EC (Salinity)";
  return METRIC_LABELS[metric] ?? metric.toUpperCase();
}