/*
  Warnings:

  - The values [Pushups,Squats,Plank,Situps] on the enum `WorkoutType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutType_new" AS ENUM ('pushups', 'squat', 'plank', 'situp');
ALTER TYPE "WorkoutType" RENAME TO "WorkoutType_old";
ALTER TYPE "WorkoutType_new" RENAME TO "WorkoutType";
DROP TYPE "WorkoutType_old";
COMMIT;
