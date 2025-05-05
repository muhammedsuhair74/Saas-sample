// src/components/WorkoutDropdown.tsx
"use client";

import React from "react";

type WorkoutDropdownProps = {
  selectedWorkout: string;
  setSelectedWorkout: React.Dispatch<React.SetStateAction<string>>;
};

const workoutOptions = [
  { name: "Push-ups", value: "pushups" },
  { name: "Squats", value: "squats" },
  { name: "Lunges", value: "lunges" },
  { name: "Pull-ups", value: "pull-ups" },
  { name: "Plank", value: "plank" },
];

const WorkoutDropdown = ({ selectedWorkout, setSelectedWorkout }: WorkoutDropdownProps) => {
  return (
    <select
      value={selectedWorkout}
      onChange={(e) => setSelectedWorkout(e.target.value)}
      className="px-4 py-2 border rounded-md bg-black text-white pr-1"
    >
      {workoutOptions.map((workout) => (
        <option key={workout.value} value={workout.value}>
          {workout.name}
        </option>
      ))}
    </select>
  );
};

export default WorkoutDropdown;

