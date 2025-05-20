export const formatWorkoutData = (data: any) =>
    data.map((item: any) => ({
      id: item.user.id,
      name: item.user.name,
      workoutType: item.workoutType,
      reps: item._sum.reps,
      avatarUrl: item.user.avatarUrl,
    }));