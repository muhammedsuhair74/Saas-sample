'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkoutDropdown from "@/components/workoutDropDown";
import Leaderboard from "@/containers/leaderboard/components/Leaderboard";
import { useEffect, useState } from "react";
import { LeaderboardProps } from "../../../type";
import { getLeaderboard } from "./actions";

const LeaderboardWrapper = ({ data }: { data: any }) => {

  console.log(data);

  const formatWorkoutData = (data: any) =>
    data.map((item: any) => ({
      id: item.user.id,
      name: item.user.name,
      workoutType: item.workoutType,
      reps: item._sum.reps,
      avatarUrl: item.user.avatarUrl,
    }));

  const [selectedWorkout, setSelectedWorkout] = useState<string>("all");
  const [leaderboard, setLeaderboard] = useState<LeaderboardProps[]>(formatWorkoutData(data));


  // useEffect(() => {
  //   setLeaderboard(formatWorkoutData(data));
  // }, [data.length]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard(selectedWorkout);
      console.log(data);
      const formattedData = formatWorkoutData(data);
      setLeaderboard(formattedData);
    };
    fetchLeaderboard();
  }, [selectedWorkout]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>🏆 Workout Leaderboard</CardTitle>
          <div className="mt-4">
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
            <WorkoutDropdown selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} />
          </div>

        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leaderboard.map((user: LeaderboardProps) => (
              <Leaderboard key={user.id} data={user} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeaderboardWrapper;