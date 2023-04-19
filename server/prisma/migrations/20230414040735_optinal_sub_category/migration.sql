-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "subCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subcategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
