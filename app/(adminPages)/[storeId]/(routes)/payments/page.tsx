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

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const productsMap = products.reduce((acc, product) => {
    acc[product.id] = {
      productName: product.productName,
      productImages: product.productImages,
      price: product.price,
    };
    return acc;
  }, {} as ProductWithDetails);

  const paymentsWithProductDetails = payments.map((payment) => ({
    ...payment,
    ...productsMap[payment.productId],
  }));

  return (
    <div>
      <PaymentsClient paymentsWithProductDetails={paymentsWithProductDetails} />
    </div>
  );
}
