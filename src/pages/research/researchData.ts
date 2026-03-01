// src/pages/research/researchData.ts

/**
 * 1) Research articles (PDF links, summary, tags)
 * 2) "Rules" extracted from those articles that we can compare with sensor readings
 * 3) Static recommendations that always show under the article
**/ 
export type SoilMetric = "moisture" | "ph" | "temperature" | "ec";

/**
 * rule is a machine-readable threshold extracted from research
 * If the sensor value goes outside the rule, we create an alerts and show recommendation
 */
export interface ArticleRule {
  metric: SoilMetric;
  metricLabel?: string;

  /**
   * thresholds:
   * - if min is defined and value < min => "low" alert
   * - ff max is defined and value > max => "high" alert
   */
  min?: number;
  max?: number;
  bands?: Array<{
    name: string; // eg, "slightly alkaline", "strongly alkaline"
    min?: number;
    max?: number;
    severity?: "info" | "warning" | "critical";
    recommendation?: string;
  }>;

  /**
   * Rrcommendations when outside min/max
   * These will be shown in Alerts page (global) and Research page under that article (per article)
   */
  recommendLow?: string;
  recommendHigh?: string;

  /**
   * how serious the alert is by default
   * if bands are used, band.severity can override this
   */
  severity?: "info" | "warning" | "critical";

  /**
   * optional: what the rule is intended for (ex: rice vs general soil health)
   * this is useful if you later add crop selection
   */
  context?: "general" | "wheat" | "barley" | "rice";
}

//existing base article data + rules & recommendations
export interface ResearchArticle {
  id: number;
  title: string;
  source: string; // real pdf link
  year: number;
  summary: string;
  tags: string[];

  /**
   * static recommendations that always display under the article
   * (even if no sensor-based alert is active)
   */
  staticRecommendations?: string[];

  /**
   * threshold rules used by the alert engine (sensor comparison)
   */
  rules?: ArticleRule[];
}

export const RESEARCH_DATA: ResearchArticle[] = [
  {
    id: 1,
    title: "On The Evaluation of The Effect of Soil and Fertilizer Treatment on The Cultivation of Cereal Crops",
    source:
      "https://www.mediresonline.org/secure/uploads/articles/Article-15-20251106234246.pdf",
    year: 2022,
    summary:
      "Study on winter wheat in Ganja-Gazakh area showing fertilizer + soil treatment impact on yield. Notes best fertilizer effect when soil reaction is close to neutrality; measured soil pH is alkaline.",
    tags: ["wheat", "fertilizer", "pH", "NPK", "yield"],

    staticRecommendations: [
      //from conclusion/summary in the article:
      "Recommended annual fertilizer plan for winter wheat: manure 10 t/ha + N90P90K60.",
      "Traditional loosening (20–22 cm) or minimal tillage; replace minimal with traditional after ~3 years.",
    ],

    rules: [
      //article shows pH range 7.8–8.4 in their soils and mentions "close to neutrality" is desired
      {
        metric: "ph",
        metricLabel: "Soil pH",
        // ifsystem wants “near neutral” guidance, this is a common neutral band
        //article doesnt define exact "neutral range" but implies it is better than alkaline
        min: 6.5,
        max: 7.5,
        severity: "warning",
        context: "wheat",
        recommendLow:
          "Soil is acidic. Consider gradual pH correction based on soil test (e.g., liming) to approach near-neutral conditions.",
        recommendHigh:
          "Soil is alkaline. Aim to move pH closer to neutral for better fertilizer efficiency; consider organic matter additions and soil-test-guided acidifying amendments.",
        bands: [
          {
            name: "alkaline (measured in study)",
            min: 7.8,
            severity: "warning",
            recommendation:
              "Study soils were alkaline (pH ~7.8–8.4). If your field pH is in this range, fertilizer response may improve if pH is managed closer to neutral.",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title:
      "Impact of varied NPK fertilizer application rates and seed quantities on barley yield (Gobustan chestnut soils)",
    source: "https://ejss.fesss.org/10.18393/ejss.1356604/pdf",
    year: 2023,
    summary:
      "Barley field study in Gobustan (2016–2019): yield increases with NPK, and soil pH is alkaline (~8.25–8.60 by depth). Best yield observed with 140 kg/ha seed rate and N60P45K45.",
    tags: ["barley", "NPK", "pH", "Gobustan", "yield"],

    staticRecommendations: [
      "Best-performing treatment reported: 140 kg/ha seed rate with N60P45K45 (highest average grain yield ~5.14 t/ha).",
      "Higher NPK rates increase available soil nutrients, but nutrients decline over plant growth stages due to uptake.",
    ],

    rules: [
      //in article pH is high (8.25–8.60). For alerts, we can classify levels
      {
        metric: "ph",
        metricLabel: "Soil pH",
        severity: "warning",
        context: "barley",
        bands: [
          {
            name: "slightly alkaline",
            min: 7.1,
            max: 7.5,
            severity: "info",
            recommendation:
              "Slightly alkaline pH. Monitor trends and manage with organic matter / soil-test-guided practices if needed.",
          },
          {
            name: "alkaline",
            min: 7.6,
            max: 8.1,
            severity: "warning",
            recommendation:
              "Alkaline pH. Consider management strategies (organic matter, amendments) based on soil test to support nutrient availability.",
          },
          {
            name: "strongly alkaline (chestnut soil baseline in study)",
            min: 8.2,
            severity: "critical",
            recommendation:
              "Strongly alkaline. Study chestnut soils in Gobustan showed pH ~8.25–8.60. High pH can reduce availability of some nutrients; apply corrective actions based on soil test.",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title:
      "Soil fertility status, productivity challenges, and solutions in rice farming landscapes of Azerbaijan",
    source: "https://ejss.fesss.org/10.18393/ejss.1399553/pdf",
    year: 2024,
    summary:
      "Rice field soils across Azerbaijan: highlights challenges from unsuitable pH, high salinity (EC), high exchangeable sodium (sodicity), low organic matter, and Zn/Mn deficiencies. Provides corrective measures.",
    tags: ["rice", "pH", "salinity", "EC", "soil health", "recommendations"],

    staticRecommendations: [
      "For rice, optimal pH is around 6; many sampled soils are alkaline (pH > 7.3).",
      "If salinity is present: install drainage systems and leach soils to remove salts.",
      "Increase organic matter toward ~3% using low-salt composts (plant/animal sources).",
      "If sodicity (high sodium/ESP) is present: apply gypsum (CaSO4) and leach sodium.",
      "If Zn or Mn deficiencies exist: foliar application may be necessary.",
      "Apply potassium before rice planting; Ca/K imbalance means rice may still respond positively to potassium.",
    ],

    rules: [
      //pH rule for rice (the paper explicitly states optimal around 6)
      {
        metric: "ph",
        metricLabel: "Soil pH (Rice)",
        // We'll treat "too alkaline for rice" as > 7.3, based on the article statement
        max: 7.3,
        severity: "warning",
        context: "rice",
        recommendHigh:
          "Soil is too alkaline for rice. Use soil acidifying materials (e.g., sulfur-based compounds) where appropriate; if sodium/sodicity is also high, address sodicity first (e.g., gypsum + leaching).",
      },

      // salinity rule via electrical conductivity (EC) (sensor-compatible if we have EC readings)
      {
        metric: "ec",
        metricLabel: "Salinity (EC, dS/m)",
        //artcile cites rice recommended EC < 0.90 dS/m; severe issue > 4 dS/m.
        max: 0.9,
        severity: "warning",
        context: "rice",
        recommendHigh:
          "EC indicates salinity risk for rice. Improve drainage and leach soil to remove excess salts.",
        bands: [
          {
            name: "severe salinity",
            min: 4,
            severity: "critical",
            recommendation:
              "Severe salinity (>4 dS/m). Drainage + leaching is strongly recommended before rice cultivation.",
          },
        ],
      },
    ],
  },
];