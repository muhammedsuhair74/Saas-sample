"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

type ChartData = {
  label: string;
  reps: number;
};

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Workout Reps Chart",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 10 },
    },
  },
};

export default function WorkoutChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/charts/${view}`);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [view]);

  const chartData = {
    labels: data.map((entry) => entry.label || entry.date || entry.week || entry.month),
    datasets: [
      {
        label: "Reps",
        data: data.map((entry) => entry.reps),
        fill: false,
        borderColor: "#16a34a",
        backgroundColor: "#16a34a",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Select View:</label>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as any)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Line
        data={chartData}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            title: { text: `${view[0].toUpperCase()}${view.slice(1)} Workout Chart` },
          },
        }}
      />
    </div>
  );
}
