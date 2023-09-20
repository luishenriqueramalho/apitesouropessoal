-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPremium" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipoPlano" TEXT NOT NULL,
    "valorPagamento" DOUBLE PRECISION NOT NULL,
    "situacao" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "nomeBanco" TEXT NOT NULL,
    "diaVencimento" DOUBLE PRECISION NOT NULL,
    "limiteTotal" DOUBLE PRECISION NOT NULL,
    "limiteDisponivel" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPremium" ADD CONSTRAINT "UserPremium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
