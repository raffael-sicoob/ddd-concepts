/*
  Warnings:

  - You are about to drop the column `address` on the `customers` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardPoints` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "rewardPoints" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "customers_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("active", "id", "name") SELECT "active", "id", "name" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
