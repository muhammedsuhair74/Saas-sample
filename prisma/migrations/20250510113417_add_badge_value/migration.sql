/*
  Warnings:

  - Added the required column `value` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "value" INTEGER NOT NULL;
