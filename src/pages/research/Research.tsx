// src/pages/research/Research.tsx
import { useMemo, useState } from "react";
import "./Research.css";
import { RESEARCH_DATA } from "./researchData";
import type {  ResearchArticle } from "./researchData";
//research page to show organized article info in the UI
//Search + tag filter + expandable details

export default function Research() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // collect tags for filter dropdown
  const tags = useMemo(() => {
    const all = new Set<string>();
    RESEARCH_DATA.forEach((a) => a.tags.forEach((t) => all.add(t)));
    return ["all", ...Array.from(all).sort()];
  }, []);

  //filter by search + tag
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return RESEARCH_DATA.filter((a) => {
      const matchesSearch =
        !s ||
        a.title.toLowerCase().includes(s) ||
        a.summary.toLowerCase().includes(s) ||
        (a.source ?? "").toLowerCase().includes(s);

      const matchesTag = selectedTag === "all" || a.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="research-page">
      <div className="research-card">
        <div className="research-header">
          <h1>Research</h1>
          <p className="research-subtitle">
            Organized notes from agricultural articles. (Later we can connect alerts/recommendations to this.)
          </p>
        </div>

        <div className="research-controls">
          <div className="control">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, summary, pdf name..."
            />
          </div>

          <div className="control">
            <label htmlFor="tag">Tag</label>
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="research-list">
          {filtered.length === 0 ? (
            <p className="empty-text">No matching articles found.</p>
          ) : (
            filtered.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isOpen={openId === article.id}
                onToggle={() => toggleOpen(article.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  isOpen,
  onToggle,
}: {
  article: ResearchArticle;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="article">
      <div className="article-top">
        <div className="article-title">
          <h2>{article.title}</h2>
          <p className="article-meta">
            {article.source ? <span>Source: {article.source}</span> : null}
            {article.year ? <span> • {article.year}</span> : null}
          </p>

          
          <p className="article-summary">{article.summary}</p>

          <div className="tag-row">
            {article.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <button className="toggle-btn" onClick={onToggle}>
          {isOpen ? "Hide details" : "Show details"}
        </button>
      </div>

      {isOpen && (
        <div className="article-details">
          <div className="details-section">
            <h3>Key Points</h3>
            <ul>
              {article.keyPoints.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>

          {article.ranges && article.ranges.length > 0 && (
            <div className="details-section">
              <h3>Ranges / Thresholds</h3>
              <div className="ranges">
                {article.ranges.map((r, idx) => (
                  <div className="range" key={idx}>
                    <div className="range-label">{r.label}</div>
                    <div className="range-value">{r.value}</div>
                    {r.note ? <div className="range-note">{r.note}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.recommendations && article.recommendations.length > 0 && (
            <div className="details-section">
              <h3>Recommendations</h3>
              <ul>
                {article.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>

              {/* small note about future linking */}
              <p className="small-note">
                Note: Next step is to map these recommendations to your Alerts page based on soil thresholds.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}