"use client";

import { useState } from "react";

const LeaderboardFilters = ({
  onFetch,
}: {
  onFetch: (filters: { date?: string; hour?: string; workoutType?: string }) => void;
}) => {
  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [workoutType, setWorkoutType] = useState<string>("pushups");

  const handleSubmit = () => {
    const filters: {
      date?: string;
      hour?: string;
      workoutType?: string;
    } = {};

    if (date) filters.date = date;
    if (hour) filters.hour = hour;
    if (workoutType) filters.workoutType = workoutType;

    onFetch(filters);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      {/* Date */}
      <div>
        <label className="block mb-1 text-sm font-medium">Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Hour */}
      <div>
        <label className="block mb-1 text-sm font-medium">Hour</label>
        <select
          className="border rounded px-3 py-2"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        >
          <option value="">Select Hour</option>
          {Array.from({ length: 24 }).map((_, i) => (
            <option key={i} value={i.toString()}>
              {i}:00
            </option>
          ))}
        </select>
      </div>

      {/* Workout Type */}
      <div>
        <label className="block mb-1 text-sm font-medium">Workout</label>
        <select
          className="border rounded px-3 py-2"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        >
          <option value="">Select Workout</option>
          <option value="pushups">Pushups</option>
          <option value="squats">Squats</option>
          <option value="plank">Plank</option>
          <option value="situps">Situps</option>
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardFilters;
