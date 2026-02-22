// src/pages/research/researchData.ts

export type ResearchRange = {
  label: string;  //eg, "pH (general)"
  value: string;   //eg, "6.0 – 7.5"
  note?: string;    //optional short note
};

export type ResearchArticle = {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  source?: string;      // journal/conference/pdf name
  summary: string;   //1-2 sentences
  keyPoints: string[];  // bullet list
  ranges?: ResearchRange[];
  recommendations?: string[]; //suggestions taken from paper ideas
  tags: string[];       // for filtering in UI
};

export const RESEARCH_DATA: ResearchArticle[] = [
  {
    id: "article-1",
    title: "Article 1 (PDF) – Soil / Agriculture Research",
    source: "Article-15-20251106234246.pdf",
    year: "2025",
    summary:
      "This article discusses soil conditions and how different soil parameters relate to productivity and soil health.",
    keyPoints: [
      "Soil parameters like pH, moisture, and nutrients affect plant growth.",
      "Balanced soil conditions help increase yield and reduce risk.",
      "Monitoring readings can help farmers react early.",
    ],
    ranges: [
      { label: "pH (general)", value: "≈ 6.0 – 7.5", note: "Common safe range for many crops" },
      { label: "Moisture", value: "Depends on crop/soil type", note: "Use thresholds based on local soil" },
    ],
    recommendations: [
      "If pH is low, consider liming (depends on soil test).",
      "If moisture is low, irrigation scheduling can help.",
    ],
    tags: ["pH", "moisture", "monitoring"],
  },

  {
    id: "article-2",
    title: "Article 2 (PDF) – Soil study / fertility / measurements",
    source: "10.18393-ejss.1356604-3391542.pdf",
    year: "2024",
    summary:
      "This paper focuses on soil measurement/analysis and emphasizes the importance of correct interpretation of soil readings.",
    keyPoints: [
      "Soil testing should be interpreted using ranges/thresholds.",
      "Fertility and productivity depend on nutrient balance (NPK).",
      "Organizing research into simple rules helps farmers understand results.",
    ],
    ranges: [
      { label: "NPK", value: "Varies by crop", note: "Use a category like low/medium/high" },
    ],
    recommendations: [
      "Use nutrient categories (low/medium/high) instead of only raw numbers.",
      "Combine field history + soil readings for better decisions.",
    ],
    tags: ["NPK", "fertility", "thresholds"],
  },

  {
    id: "article-3",
    title: "Article 3 (PDF) – Soil fertility status / productivity",
    source: "Soil_fertility_status,_product.pdf",
    year: "2023",
    summary:
      "This article talks about soil fertility and how nutrient status affects soil productivity and management decisions.",
    keyPoints: [
      "Soil fertility status can be grouped into classes.",
      "Decision support can be made using soil classes and ranges.",
      "Simple recommendations can be generated from thresholds.",
    ],
    ranges: [
      { label: "Fertility classes", value: "Low / Medium / High", note: "Very common approach in practice" },
    ],
    recommendations: [
      "Show a short recommendation message for each out-of-range value.",
      "Keep advice short and practical for farmers.",
    ],
    tags: ["fertility", "classification", "recommendations"],
  },
];