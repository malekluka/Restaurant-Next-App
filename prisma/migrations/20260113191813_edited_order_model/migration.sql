/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "items",
DROP COLUMN "postalCode",
DROP COLUMN "total",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";
