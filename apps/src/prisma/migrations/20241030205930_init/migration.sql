-- CreateEnum
CREATE TYPE "TypeCode" AS ENUM ('passwordRecovery', 'register', 'login', 'telegramAuth');

-- CreateTable
CREATE TABLE "CodeConfirmation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "typeCode" "TypeCode" NOT NULL,
    "code" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CodeConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeConfirmation_code_key" ON "CodeConfirmation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CodeConfirmation_userId_typeCode_key" ON "CodeConfirmation"("userId", "typeCode");

-- AddForeignKey
ALTER TABLE "CodeConfirmation" ADD CONSTRAINT "CodeConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
