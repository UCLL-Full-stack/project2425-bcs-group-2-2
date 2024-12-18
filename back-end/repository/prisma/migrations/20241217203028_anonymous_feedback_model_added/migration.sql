-- CreateTable
CREATE TABLE "AnonymousFeedback" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "AnonymousFeedback_pkey" PRIMARY KEY ("id")
);
