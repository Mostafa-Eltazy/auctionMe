/*
  Warnings:

  - You are about to drop the column `productPictures` on the `items` table. All the data in the column will be lost.
  - Added the required column `auctionId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctions" ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "productPictures",
ADD COLUMN     "auctionId" INTEGER NOT NULL,
ADD COLUMN     "pictures" TEXT[];

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
