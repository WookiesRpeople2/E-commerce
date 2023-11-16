import prismadb from "@/lib/prismadb";
import { PaymentIdClient } from "./components/client";

export default async function PaymentIdPage({
  params,
}: {
  params: { storeId: string; paymentId: string };
}) {
  const paymentItems = await prismadb.paymentItems.findMany({
    where: {
      paymentId: params.paymentId,
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      id: params.storeId,
    },
  });

  const payments = await prismadb.payment.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <PaymentIdClient
        payments={payments}
        paymentItems={paymentItems}
        products={products}
      />
    </div>
  );
}
