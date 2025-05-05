import LeaderboardWrapper from "@/containers/leaderboard/LeaderboardWrapper";


export default async function LeaderboardPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/leaderboard?workoutType=pushups`,{
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <LeaderboardWrapper data={data} />
  );
}
