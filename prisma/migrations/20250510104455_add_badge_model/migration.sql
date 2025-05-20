-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'WEEKLY_STREAK', 'MONTHLY_STREAK');

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "BadgeType" NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPermanent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Badge_userId_type_idx" ON "Badge"("userId", "type");

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
