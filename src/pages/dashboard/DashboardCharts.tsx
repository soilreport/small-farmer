import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Reading {
  time: string;
  temperature: number;
  moisture: number;
  ph: number;
}

interface DashboardChartsProps {
  readings?: Reading[];
}

const DashboardCharts = ({ readings }: DashboardChartsProps) => {
  // If no readings passed, use dummy data
  const defaultReadings: Reading[] = [
    { time: "Mon", temperature: 24, moisture: 53, ph: 6.4 },
    { time: "Tue", temperature: 26, moisture: 48, ph: 6.6 },
    { time: "Wed", temperature: 25, moisture: 50, ph: 6.5 },
    { time: "Thu", temperature: 27, moisture: 55, ph: 6.7 },
    { time: "Fri", temperature: 24, moisture: 52, ph: 6.4 },
  ];

  const data = {
    labels: readings ? readings.map(r => r.time) : defaultReadings.map(r => r.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: readings ? readings.map(r => r.temperature) : defaultReadings.map(r => r.temperature),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
      },
      {
        label: "Moisture (%)",
        data: readings ? readings.map(r => r.moisture) : defaultReadings.map(r => r.moisture),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
      },
      {
        label: "pH",
        data: readings ? readings.map(r => r.ph) : defaultReadings.map(r => r.ph),
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
      },
    ],
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px", marginTop: "2rem" }}>
      <h3>Soil Sensor Data</h3>
      <Line data={data} />
    </div>
  );
};

export default DashboardCharts;