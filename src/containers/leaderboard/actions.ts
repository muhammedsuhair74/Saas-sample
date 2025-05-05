
export const getLeaderboard = async (workoutType: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/leaderboard?workoutType=${workoutType}`);
    const data = await res.json();
    return data;
}