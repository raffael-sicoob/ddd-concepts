-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemsId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "orders_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "order_items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "rewardPoints" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "customers_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("active", "addressId", "id", "name", "rewardPoints") SELECT "active", "addressId", "id", "name", "rewardPoints" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
