export const fetchLeaderboard = async (filters: {
  date?: string;
  hour?: string;
  workoutType?: string;
}) => {
  const filteredFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined)
  );
  console.log("filteredFilters", filteredFilters);
  const params = new URLSearchParams(filteredFilters).toString();
  const res = await fetch(`/api/leaderboard${params ? `?${params}` : "?workoutType=pushups"}`);
  const data = await res.json();
  return data.leaderboard || [];
};
