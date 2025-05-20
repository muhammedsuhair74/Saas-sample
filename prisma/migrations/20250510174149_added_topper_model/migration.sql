-- CreateTable
CREATE TABLE "Toppers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'pushup',
    "badgeType" "BadgeType" NOT NULL DEFAULT 'DAILY',
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPermanent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Toppers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Toppers_userId_type_idx" ON "Toppers"("userId", "type");

-- AddForeignKey
ALTER TABLE "Toppers" ADD CONSTRAINT "Toppers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
