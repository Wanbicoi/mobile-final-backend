-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL DEFAULT '[]',
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Food_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_CommentToFood" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CommentToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CommentToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToFood" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToFood_AB_unique" ON "_CommentToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToFood_B_index" ON "_CommentToFood"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToFood_AB_unique" ON "_CategoryToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToFood_B_index" ON "_CategoryToFood"("B");
