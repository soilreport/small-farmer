// src/pages/research/Research.tsx

import { useMemo, useState } from "react";
import "./Research.css";
import { RESEARCH_DATA } from "./researchData";

//get computed alerts/recommendations from global context
import { useSoilInsights } from "../../context/SoilInsightsContext";
import type { SoilAlert } from "../../utils/evaluateInsights";

export default function Research() {
  //search input
  const [search, setSearch] = useState("");

  // selected tag
  const [selectedTag, setSelectedTag] = useState("all");

  //pull insights from context (generated from sensor readings + research rules)
  const { insights } = useSoilInsights();

  //collect all tags for dropdown
  const tags = useMemo(() => {
    const all = RESEARCH_DATA.flatMap((a) => a.tags);
    return ["all", ...Array.from(new Set(all))];
  }, []);

  //filter logic
  const filtered = RESEARCH_DATA.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());

    const matchTag = selectedTag === "all" || article.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  return (
    <div className="research-container">
      <h1>Research</h1>

      {/* search */}
      <input
        className="search-input"
        placeholder="Search title or summary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* tag filter */}
      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        {tags.map((tag) => (
          <option key={tag}>{tag}</option>
        ))}
      </select>

      {/* article cards */}
      {filtered.map((article) => {
        // per-article insight bucket
        // alerts: triggered by comparing sensor readings to article rules
        // recommendations: static + sensor-based (unique)
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

          
            {/* Alerts / Findings  */}
          
            <div style={{ marginTop: 14 }}>
              <h3 style={{ marginBottom: 6 }}>Alerts / Findings</h3>

              {alerts.length === 0 ? (
                <p style={{ opacity: 0.8 }}>
                  ✅ No alerts from this article based on current readings.
                </p>
              ) : (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {alerts.map((a) => (
                    <ResearchAlertLine key={a.id} alert={a} />
                  ))}
                </ul>
              )}
            </div>

          
            {/*  Recommendations    */}
            {/* - includes static recommendations always */}
            {/* - plus sensor-triggered ones */}
          
            <div style={{ marginTop: 12 }}>
              <h3 style={{ marginBottom: 6 }}>Recommendations</h3>

              {recommendations.length === 0 ? (
                <p style={{ opacity: 0.8 }}>No recommendations available.</p>
              ) : (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {recommendations.map((rec, idx) => (
                    <li key={`${article.id}-rec-${idx}`}>{rec}</li>
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
 * small helper component for an alert line
 * keeps Research.tsx cleaner and consistent.
 */
function ResearchAlertLine({ alert }: { alert: SoilAlert }) {
  //icon based on severity
  const icon = alert.severity === "critical" ? "🟥" : alert.severity === "warning" ? "🟧" : "🟦";

  //readable metric label
  const metricLabel =
    alert.metric === "temperature"
      ? "Temperature"
      : alert.metric === "moisture"
        ? "Moisture"
        : alert.metric === "ph"
          ? "pH"
          : alert.metric === "ec"
            ? "EC (Salinity)"
            : String(alert.metric).toUpperCase();

  return (
    <li>
      {icon} <b>{alert.title}</b> — {metricLabel}: {alert.value}
      {alert.recommendation ? <span style={{ opacity: 0.85 }}> · {alert.recommendation}</span> : null}
    </li>
  );
}