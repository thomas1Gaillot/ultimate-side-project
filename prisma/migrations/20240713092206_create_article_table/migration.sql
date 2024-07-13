-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "md" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
