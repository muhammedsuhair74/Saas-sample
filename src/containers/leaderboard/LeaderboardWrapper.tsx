'use client'
import LeaderboardFilters from "@/components/LeaderboardFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Leaderboard from "@/containers/leaderboard/components/Leaderboard";
import { useEffect, useState } from "react";
import { LeaderboardProps } from "../../../type";
import { fetchLeaderboard } from "./api";
import { formatWorkoutData } from "./utils";

const LeaderboardWrapper = () => {

  const [selectedWorkout, setSelectedWorkout] = useState<string>("pushups");
  const [leaderboard, setLeaderboard] = useState<LeaderboardProps[]>([]);


  // useEffect(() => {
  //   setLeaderboard(formatWorkoutData(data));
  // }, [data.length]);

  useEffect(() => {
    const fetchLatestLeaderboard = async () => {
      const data = await fetchLeaderboard({
        workoutType: selectedWorkout
      });
      console.log(data);
      const formattedData = formatWorkoutData(data);
      setLeaderboard(formattedData);
    };
    fetchLatestLeaderboard();
  }, [selectedWorkout]);

  const onFetch = async (filters: {
    date?: string;
    hour?: string;
    workoutType?: string;
  }) => {
    console.log("filters", filters);
    const newData = await fetchLeaderboard(filters);
    console.log("newData", newData);
    const formattedData = formatWorkoutData(newData);
    setLeaderboard(formattedData);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>🏆 Workout Leaderboard</CardTitle>
          {/* <div className="mt-4"> */}
            {/* <label className="mr-2 font-medium">Workout Type:</label>
            <select
              value={selectedWorkout}
              onChange={e => setSelectedWorkout(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All</option>
              {workoutTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select> */}
            {/* <WorkoutDropdown selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} /> */}
          {/* </div> */}

        </CardHeader>
        <CardContent>
          <LeaderboardFilters onFetch={onFetch} />
          {leaderboard.length > 0 && <ul className="space-y-4">
            {leaderboard.map((user: LeaderboardProps) => (
              <Leaderboard key={user.id} data={user} />
            ))}
          </ul>}
          {leaderboard.length === 0 && <p>No data found</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default LeaderboardWrapper;