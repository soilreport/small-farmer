import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { SOIL_RANGES } from "../../utils/soilRanges";
import type { SoilReading } from "../../utils/soilRanges";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { maxRotation: 0, font: { size: 11 } } },
    y: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { font: { size: 11 } } },
  },
};

const defaultReadings: SoilReading[] = [
  { time: "Mon", temperature: 24, moisture: 53, ph: 6.4 },
  { time: "Tue", temperature: 26, moisture: 48, ph: 6.6 },
  { time: "Wed", temperature: 25, moisture: 50, ph: 6.5 },
  { time: "Thu", temperature: 27, moisture: 55, ph: 6.7 },
  { time: "Fri", temperature: 24, moisture: 52, ph: 6.4 },
];

interface ReadingsChartsProps {
  readings?: SoilReading[] | null;
}

export default function ReadingsCharts({ readings }: ReadingsChartsProps) {
  const data = readings?.length ? readings : defaultReadings;
  const labels = data.map((r) => r.time);

  const tempData = {
    labels,
    datasets: [{
      label: "Temperature (°C)",
      data: data.map((r) => r.temperature),
      borderColor: "#e07c54",
      backgroundColor: "rgba(224, 124, 84, 0.15)",
      fill: true,
      tension: 0.3,
    }],
  };

  const moistureData = {
    labels,
    datasets: [{
      label: "Moisture (%)",
      data: data.map((r) => r.moisture),
      borderColor: "#5b8def",
      backgroundColor: "rgba(91, 141, 239, 0.15)",
      fill: true,
      tension: 0.3,
    }],
  };

  const phData = {
    labels,
    datasets: [{
      label: "pH",
      data: data.map((r) => r.ph),
      backgroundColor: "rgba(94, 163, 94, 0.7)",
      borderColor: "#5ea35e",
      borderWidth: 1,
    }],
  };

  return (
    <div className="readings-charts">
      <div className="charts-grid">
        <div className="chart-card chart-temperature">
          <h3>Temperature</h3>
          <div className="chart-wrap">
            <Line data={tempData} options={chartOptions} />
          </div>
          <p className="chart-meta">Optimal: {SOIL_RANGES.temperature.min}–{SOIL_RANGES.temperature.max}{SOIL_RANGES.temperature.unit}</p>
        </div>
        <div className="chart-card chart-moisture">
          <h3>Moisture</h3>
          <div className="chart-wrap">
            <Line data={moistureData} options={chartOptions} />
          </div>
          <p className="chart-meta">Optimal: {SOIL_RANGES.moisture.min}–{SOIL_RANGES.moisture.max}{SOIL_RANGES.moisture.unit}</p>
        </div>
        <div className="chart-card chart-ph">
          <h3>pH</h3>
          <div className="chart-wrap">
            <Bar data={phData} options={chartOptions} />
          </div>
          <p className="chart-meta">Optimal: {SOIL_RANGES.ph.min}–{SOIL_RANGES.ph.max}</p>
        </div>
      </div>
    </div>
  );
}
