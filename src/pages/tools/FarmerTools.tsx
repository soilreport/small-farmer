import { useState } from "react";
import "./FarmerTools.css";

type RegionKey = "default" | "lowlands" | "highlands" | "coastal";

interface WeatherInfo {
  label: string;
  icon: string;
  temperature: string;
  summary: string;
  rainChance: string;
}

const WEATHER_BY_REGION: Record<RegionKey, WeatherInfo> = {
  default: {
    label: "Select a region to see a quick weather snapshot.",
    icon: "🌍",
    temperature: "--",
    summary: "No region selected yet.",
    rainChance: "--",
  },
  lowlands: {
    label: "Lowland fields",
    icon: "🌾",
    temperature: "22–27 °C",
    summary: "Warm days, mild nights. Good for irrigation planning.",
    rainChance: "20–30% chance of light showers",
  },
  highlands: {
    label: "Highland terraces",
    icon: "⛰️",
    temperature: "15–20 °C",
    summary: "Cooler conditions. Watch out for sudden temperature drops at night.",
    rainChance: "35–45% chance of rain in the evening",
  },
  coastal: {
    label: "Coastal farms",
    icon: "🌊",
    temperature: "18–24 °C",
    summary: "Humid air with gentle breeze. Favourable for leafy vegetables.",
    rainChance: "40–60% chance of scattered showers",
  },
};

interface YieldInputs {
  crop: string;
  areaHa: string;
  yieldPerHa: string;
  pricePerUnit: string;
}

export default function FarmerTools() {
  const [regionKey, setRegionKey] = useState<RegionKey>("default");

  const [inputs, setInputs] = useState<YieldInputs>({
    crop: "wheat",
    areaHa: "2",
    yieldPerHa: "4",
    pricePerUnit: "230",
  });

  const area = Number(inputs.areaHa) || 0;
  const yieldPerHa = Number(inputs.yieldPerHa) || 0;
  const pricePerUnit = Number(inputs.pricePerUnit) || 0;

  const totalYield = area * yieldPerHa;
  const totalRevenue = totalYield * pricePerUnit;

  const handleChange = (field: keyof YieldInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const selectedWeather = WEATHER_BY_REGION[regionKey] ?? WEATHER_BY_REGION.default;

  return (
    <div className="tools-page">
      <header className="tools-header">
        <div className="tools-title-block">
          <h1>Farmer tools</h1>
          <p className="tools-subtitle">
            Quick helpers for planning your week in the field. Data here is sample-only and does not
            replace local weather or agronomist advice.
          </p>
        </div>
        <div className="tools-hero-illustration" aria-hidden="true">
          <span className="tools-hero-sun">☀️</span>
          <span className="tools-hero-cloud">⛅</span>
          <span className="tools-hero-field">🌾</span>
        </div>
      </header>

      <section className="tools-grid">
        <article className="tool-card weather-card">
          <h2>Weather snapshot</h2>
          <p className="tool-description">
            Choose a region to see an example of what conditions might look like there. This helps
            you decide when to irrigate, spray, or harvest.
          </p>

          <div className="weather-select-row">
            <label htmlFor="region-select">Region</label>
            <select
              id="region-select"
              value={regionKey}
              onChange={(e) => setRegionKey(e.target.value as RegionKey)}
            >
              <option value="default">Select region…</option>
              <option value="lowlands">Lowlands</option>
              <option value="highlands">Highlands</option>
              <option value="coastal">Coastal</option>
            </select>
          </div>

          <div className="weather-summary">
            <div className="weather-main">
              <div className="weather-icon" aria-hidden="true">
                {selectedWeather.icon}
              </div>
              <div>
                <h3>{selectedWeather.label}</h3>
                <p className="weather-temp">{selectedWeather.temperature}</p>
              </div>
            </div>
            <p className="weather-text">{selectedWeather.summary}</p>
            <p className="weather-rain">Rain: {selectedWeather.rainChance}</p>
          </div>

          <p className="tool-note">
            Tip: In a real deployment, this card can be connected to a live weather API for your
            location.
          </p>
        </article>

        <article className="tool-card yield-card">
          <h2>Crop yield & income estimator</h2>
          <p className="tool-description">
            Enter your field size, expected yield and price to get a rough estimate of total
            harvest and potential income.
          </p>

          <div className="yield-form">
            <div className="yield-field">
              <label htmlFor="crop-input">Crop</label>
              <input
                id="crop-input"
                value={inputs.crop}
                onChange={(e) => handleChange("crop", e.target.value)}
                placeholder="e.g. wheat, tomato"
              />
            </div>

            <div className="yield-row">
              <div className="yield-field">
                <label htmlFor="area-input">Field area (ha)</label>
                <input
                  id="area-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={inputs.areaHa}
                  onChange={(e) => handleChange("areaHa", e.target.value)}
                />
              </div>
              <div className="yield-field">
                <label htmlFor="yield-input">Expected yield (t/ha)</label>
                <input
                  id="yield-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={inputs.yieldPerHa}
                  onChange={(e) => handleChange("yieldPerHa", e.target.value)}
                />
              </div>
            </div>

            <div className="yield-row">
              <div className="yield-field">
                <label htmlFor="price-input">Price per ton (local currency)</label>
                <input
                  id="price-input"
                  type="number"
                  min="0"
                  step="1"
                  value={inputs.pricePerUnit}
                  onChange={(e) => handleChange("pricePerUnit", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="yield-results">
            <div className="yield-result-pill">
              <span className="pill-label">Estimated total yield</span>
              <span className="pill-value">
                {Number.isFinite(totalYield) ? totalYield.toFixed(1) : "0.0"} t
              </span>
            </div>
            <div className="yield-result-pill">
              <span className="pill-label">Estimated income</span>
              <span className="pill-value">
                {Number.isFinite(totalRevenue) ? totalRevenue.toLocaleString() : "0"}{" "}
                <span className="pill-currency">₼</span>
              </span>
            </div>
          </div>

          <p className="tool-note">
            This is only a simple estimation tool. Actual results will depend on real yields, market
            prices, and production costs.
          </p>
        </article>
      </section>
    </div>
  );
}

