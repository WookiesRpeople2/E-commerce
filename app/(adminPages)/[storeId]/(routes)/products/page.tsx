import prismadb from "@/lib/prismadb";
import { ProductsHomeClient } from "./components/client";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <ProductsHomeClient products={products} />
    </>
  );
}
