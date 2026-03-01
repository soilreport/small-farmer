import "./Resources.css";

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon: string;
}

const RESOURCES: ResourceLink[] = [
  {
    title: "Local weather service",
    description: "Check official forecasts before irrigation or spraying.",
    url: "https://www.meteoblue.com/",
    icon: "🌦️",
  },
  {
    title: "FAO – Food and Agriculture Organization",
    description: "Guides and best practices for smallholder farmers worldwide.",
    url: "https://www.fao.org/",
    icon: "🌍",
  },
  {
    title: "Soil health basics",
    description: "Learn about pH, organic matter and how they affect crops.",
    url: "https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-health",
    icon: "🧪",
  },
  {
    title: "Open-source agriculture tools",
    description: "Explore community projects for sensors, dashboards and farm apps.",
    url: "https://github.com/topics/agriculture",
    icon: "💻",
  },
];

export default function Resources() {
  return (
    <div className="resources-page">
      <header className="resources-header">
        <div>
          <h1>Farmer resources</h1>
          <p>
            A small collection of external links you can explore for more detail on weather,
            agronomy and digital tools. You can replace these with local resources later.
          </p>
        </div>
        <div className="resources-illustration" aria-hidden="true">
          <span>📚</span>
          <span>🌱</span>
        </div>
      </header>

      <section className="resources-grid">
        {RESOURCES.map((item) => (
          <a
            key={item.title}
            className="resource-card"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="resource-icon" aria-hidden="true">
              {item.icon}
            </div>
            <div className="resource-text">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="resource-link-hint">Open link ↗</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

