-- CreateTable
CREATE TABLE "Roadmap" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "badge" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);
