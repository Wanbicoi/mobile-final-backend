/*
  Warnings:

  - You are about to drop the `_CommentToFood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foodId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CommentToFood_B_index";

-- DropIndex
DROP INDEX "_CommentToFood_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CommentToFood";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "body", "createdAt", "id") SELECT "authorId", "body", "createdAt", "id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
