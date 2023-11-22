import prismadb from "@/lib/prismadb";
import { PaymentsClient } from "./components/client";

type ProductWithDetails = Record<
  string,
  { productName: string; productImages: string[]; price: number }
>;

export default async function PaymentsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const payments = await prismadb.payment.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <PaymentsClient payments={payments} />
    </div>
  );
}
