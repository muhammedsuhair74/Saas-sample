export type LeaderboardUser = {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
    totalWorkouts: number;
  };

  export type LeaderboardProps = {
    name: string;
    id: string;
    workoutType: string;
    reps: number;
    avatarUrl: string;
}