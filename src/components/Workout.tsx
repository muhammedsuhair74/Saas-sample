"use client";

import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface WorkoutChartProps {
  chartType: "daily" | "weekly" | "monthly";
  date: string; // Format: "yyyy-MM-dd"
}

interface ChartDataItem {
  hour?: string;
  day?: string;
  pushups: number;
  squat: number;
  plank: number;
  situp: number;
}

const WorkoutChart: React.FC<WorkoutChartProps> = ({ chartType, date }) => {
  const [chartData, setChartData] = useState<ChartDataItem[] | null>(null);

  useEffect(() => {
    console.log(date);
    const fetchChartData = async () => {
      let data;
      try {
        let response;
        if (chartType === "daily") {
          response = await fetch(`/api/charts/daily?date=${date}`);
          data = await response?.json();

          console.log("daily", response);
        } else if (chartType === "weekly") {
          console.log("weekly date", date);
          response = await fetch(`/api/charts/weekly?date=${date}`);
          data = await response?.json();
          console.log("weekly", response);
        } else if (chartType === "monthly") {
          response = await fetch(`/api/charts/monthly?date=${date}`);
          data = await response?.json();
          console.log("monthly", response);
        }

        console.log(data);
        if (response?.ok) {
          setChartData(data);
        } else {
          console.error("Failed to fetch chart data", data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [chartType, date]);

  const generateChartOptions = () => ({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Workout Chart`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: chartType === "daily" ? "Day" : chartType === "weekly" ? "Weekday" : "Day of Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Reps",
        },
        beginAtZero: true,
      },
    },
  });

  const generateChartData = (): ChartData<"line"> => {
    if (!chartData) return { labels: [], datasets: [] };

    // Extract workout types (pushups, squats, etc.) and data for the chart
    const workoutTypes = ["pushups", "squat", "plank", "situp"];
    const labels = chartData.map((item: ChartDataItem) => item.day || item.hour);

    const datasets = workoutTypes.map((workoutType) => ({
      label: workoutType.charAt(0).toUpperCase() + workoutType.slice(1),
      data: chartData.map((item: ChartDataItem) =>
        Number(item[workoutType as keyof ChartDataItem] ?? 0)
      ),
      fill: false,
      borderColor:
        workoutType === "pushups"
          ? "rgb(255, 99, 132)"
          : workoutType === "squat"
            ? "rgb(54, 162, 235)"
            : workoutType === "plank"
              ? "rgb(75, 192, 192)"
              : "rgb(153, 102, 255)",
      tension: 0.1,
    }));

    return {
      labels,
      datasets,
    };
  };

  return (
    <div className="my-8">
      {chartData ? (
        <Line data={generateChartData()} options={generateChartOptions()} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default WorkoutChart;
