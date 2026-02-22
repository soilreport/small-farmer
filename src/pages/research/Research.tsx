// src/pages/research/Research.tsx

import { useMemo, useState } from "react";
import "./Research.css";
import { RESEARCH_DATA } from "./researchData";

export default function Research() {
  // ADDED: search input
  const [search, setSearch] = useState("");

  // ADDED: selected tag
  const [selectedTag, setSelectedTag] = useState("all");

  // ADDED: collect all tags for dropdown
  const tags = useMemo(() => {
    const all = RESEARCH_DATA.flatMap((a) => a.tags);
    return ["all", ...Array.from(new Set(all))];
  }, []);

  // ADDED: filter logic
  const filtered = RESEARCH_DATA.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());

    const matchTag =
      selectedTag === "all" || article.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  return (
    <div className="research-container">
      <h1>Research</h1>

      {/* ADDED: search */}
      <input
        className="search-input"
        placeholder="Search title or summary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ADDED: tag filter */}
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        {tags.map((tag) => (
          <option key={tag}>{tag}</option>
        ))}
      </select>

      {/* ADDED: article cards */}
      {filtered.map((article) => (
        <div className="research-card" key={article.id}>
          <h2>
            Article {article.id} (PDF) – {article.title}
          </h2>

          <p>
            Source:{" "}
            <a href={article.source} target="_blank">
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
        </div>
      ))}
    </div>
  );
}