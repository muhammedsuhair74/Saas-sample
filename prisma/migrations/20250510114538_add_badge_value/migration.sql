/*
  Warnings:

  - The `type` column on the `Badge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "badgeType" "BadgeType" NOT NULL DEFAULT 'DAILY',
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'pushup',
ALTER COLUMN "value" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "Badge_userId_type_idx" ON "Badge"("userId", "type");
