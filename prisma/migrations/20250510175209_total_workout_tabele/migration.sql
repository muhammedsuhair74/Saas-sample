/*
  Warnings:

  - You are about to drop the `Toppers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Toppers" DROP CONSTRAINT "Toppers_userId_fkey";

-- DropTable
DROP TABLE "Toppers";

-- CreateTable
CREATE TABLE "TotalWorkouts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'pushup',
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TotalWorkouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TotalWorkouts_userId_type_idx" ON "TotalWorkouts"("userId", "type");

-- AddForeignKey
ALTER TABLE "TotalWorkouts" ADD CONSTRAINT "TotalWorkouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
