-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name_cliente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesOrders" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "sales_order_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(65,30) NOT NULL,
    "unitary_value" DECIMAL(65,30) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "salesOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "salesOrders" ADD CONSTRAINT "salesOrders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
