import { ProductAddEditFormClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function ProductsEditAndNewPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
      storeId: params.storeId,
    },
  });

  if (!product) {
    redirect(`/${params.storeId}/products`);
  }

  return (
    <>
      <ProductAddEditFormClient data={product} />
    </>
  );
}
