// src/pages/research/researchData.ts

// ADDED: structure for research articles
export interface ResearchArticle {
  id: number;
  title: string;
  source: string; // real PDF link
  year: number;
  summary: string;
  tags: string[];
}

// ADDED: your 3 real articles
export const RESEARCH_DATA: ResearchArticle[] = [
  {
    id: 1,
    title: "Soil / Agriculture Research",
    source:
      "https://www.mediresonline.org/secure/uploads/articles/Article-15-20251106234246.pdf",
    year: 2025,
    summary:
      "Explains soil monitoring, pH, moisture and temperature effects on soil health.",
    tags: ["pH", "moisture", "monitoring"],
  },
  {
    id: 2,
    title: "Soil fertility / measurements",
    source: "https://ejss.fesss.org/10.18393/ejss.1356604/pdf",
    year: 2024,
    summary:
      "Focuses on soil fertility, NPK fertilizers and their effect on productivity.",
    tags: ["NPK", "fertility", "thresholds"],
  },
  {
    id: 3,
    title: "Soil fertility status in Azerbaijan",
    source: "https://ejss.fesss.org/10.18393/ejss.1399553/pdf",
    year: 2023,
    summary:
      "Describes soil productivity problems and nutrient management solutions.",
    tags: ["productivity", "soil health"],
  },
];