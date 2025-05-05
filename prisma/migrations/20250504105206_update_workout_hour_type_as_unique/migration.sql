/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `Workout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,hour,workoutType]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Workout_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_hour_workoutType_key" ON "Workout"("userId", "hour", "workoutType");
