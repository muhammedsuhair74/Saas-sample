import WorkoutLog from "@/containers/log-workout/WorkoutLog";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const WorkoutLogPage = async () => {
  const session = await auth();

  const previousWorkout = await prisma.workout.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
 
  return (
   <WorkoutLog previousWorkout={previousWorkout} />
  );
};

export default WorkoutLogPage;
