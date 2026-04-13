import { Link, useParams } from "react-router-dom";
import "./CropRegionPage.css";

type CropId = "wheat" | "tomato" | "potato" | "grape" | "barley" | "maize" | string;

interface CropGuide {
  name: string;
  shortIntro: string;
  soil: string[];
  planting: string[];
  care: string[];
}

const CROP_GUIDES: Record<string, CropGuide> = {
  wheat: {
    name: "Wheat",
    shortIntro: "Staple cereal widely grown across Azerbaijan, especially in lowland and foothill areas.",
    soil: [
      "Prefers well‑drained loam or clay‑loam soils with pH between 6.0 and 7.5.",
      "Avoid heavy waterlogging; use raised beds or good field levelling.",
    ],
    planting: [
      "Typical sowing windows: autumn planting from October to November in many regions.",
      "Use certified seed and aim for an even seed depth of 3–5 cm.",
    ],
    care: [
      "Keep weeds under control in the first 6–8 weeks after emergence.",
      "Irrigate at critical stages (tillering, stem elongation, and grain filling) if rainfall is low.",
      "Apply nitrogen in 2–3 splits rather than all at once to reduce lodging.",
    ],
  },
  potato: {
    name: "Potato",
    shortIntro: "Important tuber crop in cooler highland areas and some irrigated lowlands.",
    soil: [
      "Loose, well‑drained sandy loam with good organic matter is ideal.",
      "Avoid very fresh manure before planting to reduce disease risk.",
    ],
    planting: [
      "Use healthy seed tubers; cut large tubers so each piece has at least one strong eye.",
      "Plant in ridges so that hilling is easy and tubers are protected from sunlight.",
    ],
    care: [
      "Hill soil around plants 1–2 times to cover developing tubers.",
      "Keep soil evenly moist; avoid long dry periods followed by heavy irrigation.",
      "Monitor regularly for late blight and beetles; remove infected leaves early.",
    ],
  },
  tomato: {
    name: "Tomato",
    shortIntro: "Popular vegetable crop for both open field and greenhouse production.",
    soil: [
      "Grows best in fertile, well‑drained soil rich in organic matter.",
      "Target soil pH between 6.0 and 7.0.",
    ],
    planting: [
      "Raise strong seedlings in trays or a nursery before transplanting.",
      "Transplant after risk of frost has passed and soils have warmed.",
    ],
    care: [
      "Stake or trellis plants to keep fruit off the soil and improve airflow.",
      "Water at the base of plants, avoiding constant wetting of leaves.",
      "Use light pruning to remove lower yellow leaves and improve air movement.",
    ],
  },
  grape: {
    name: "Grapes",
    shortIntro:
      "A traditional crop in many parts of Azerbaijan, grown for fresh fruit, drying and processing.",
    soil: [
      "Tolerates a range of soils but prefers deep, well‑drained loam.",
      "Avoid very salty or permanently waterlogged soils.",
    ],
    planting: [
      "Plant vines during dormancy (late autumn or early spring).",
      "Use strong planting material and provide a trellis or support system from the start.",
    ],
    care: [
      "Prune each winter to keep the canopy open and productive.",
      "Thin excess shoots and bunches to improve fruit quality.",
      "Monitor for downy mildew and other fungal diseases, especially after rain.",
    ],
  },
  barley: {
    name: "Barley",
    shortIntro:
      "Cool‑season cereal that can be grown in many regions, often used for feed and malting.",
    soil: [
      "Prefers moderately fertile, well‑drained soils; tolerates slightly saline conditions better than some cereals.",
      "Target pH from 6.0 to 7.5.",
    ],
    planting: [
      "Sow at similar times to wheat, adjusting to local climate.",
      "Aim for even seed distribution and good seed‑soil contact.",
    ],
    care: [
      "Avoid excessive nitrogen to reduce lodging.",
      "Control weeds early; dense, even stands compete better with weeds.",
    ],
  },
};

const REGION_CROPS: Record<string, CropId[]> = {
  highlands: ["wheat", "potato", "barley", "grape"],
};

export default function CropRegionPage() {
  const params = useParams<{
    cropId?: string;
    regionId?: string;
  }>();

  const cropKey = (params.cropId ?? "").toLowerCase() as CropId;
  const regionKey = (params.regionId ?? "").toLowerCase();

  const cropGuide = cropKey ? CROP_GUIDES[cropKey] : undefined;

  // 1) region only: list famous crops grown there
  if (regionKey && !cropGuide) {
    const crops = REGION_CROPS[regionKey] ?? [];

    return (
      <div className="crop-region-page">
        <header className="crop-region-header">
          <div>
            <h1>Crops in Azerbaijani highlands</h1>
            <p>
              These are examples of crops commonly grown in highland areas. Choose a crop to open a
              simple guide on how to grow it.
            </p>
          </div>
          <div className="crop-region-illustration" aria-hidden="true">
            <span>🌄</span>
          </div>
        </header>

        <section className="crop-region-body">
          <div className="crop-list">
            {crops.map((id) => {
              const guide = CROP_GUIDES[id];
              const name = guide?.name ?? id;
              return (
                <Link
                  key={id}
                  to={`/regions/${regionKey}/crops/${id}`}
                  className="crop-pill"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // 2) crop (with or without region): show growing guide
  if (cropGuide) {
    const title =
      regionKey === "highlands"
        ? `How to grow ${cropGuide.name} in Azerbaijani highlands`
        : `How to grow ${cropGuide.name} in Azerbaijan`;

    return (
      <div className="crop-region-page">
        <header className="crop-region-header">
          <div>
            <h1>{cropGuide.name} growing guide</h1>
            <p>{cropGuide.shortIntro}</p>
          </div>
          <div className="crop-region-illustration" aria-hidden="true">
            <span>🌾</span>
          </div>
        </header>

        <section className="crop-region-body">
          <h2>{title}</h2>

          <h3>Soil &amp; site</h3>
          <ul>
            {cropGuide.soil.map((line) => (
              <li key={`soil-${line}`}>{line}</li>
            ))}
          </ul>

          <h3>Planting</h3>
          <ul>
            {cropGuide.planting.map((line) => (
              <li key={`planting-${line}`}>{line}</li>
            ))}
          </ul>

          <h3>Care during the season</h3>
          <ul>
            {cropGuide.care.map((line) => (
              <li key={`care-${line}`}>{line}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // 3) fallback
  return (
    <div className="crop-region-page">
      <header className="crop-region-header">
        <div>
          <h1>Crop guide</h1>
          <p>Select a crop or region from the Research page links to view a guide.</p>
        </div>
      </header>
    </div>
  );
}

