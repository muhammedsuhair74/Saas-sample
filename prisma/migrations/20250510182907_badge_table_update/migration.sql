/*
  Warnings:

  - You are about to drop the column `type` on the `Badge` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Badge_userId_type_idx";

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "type",
ADD COLUMN     "workoutType" TEXT NOT NULL DEFAULT 'pushup';

-- CreateIndex
CREATE INDEX "Badge_userId_workoutType_idx" ON "Badge"("userId", "workoutType");
