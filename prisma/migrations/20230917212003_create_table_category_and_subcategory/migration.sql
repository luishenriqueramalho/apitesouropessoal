-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "nomeCategoria" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "nomeSubCategoria" TEXT NOT NULL,
    "mesInicial" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);
