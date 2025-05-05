/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `count` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Workout` table. All the data in the column will be lost.
  - The `id` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `reps` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutType` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `hour` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Workout_userId_hour_key";

-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
DROP COLUMN "count",
DROP COLUMN "name",
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workoutType" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER NOT NULL,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
