import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ProductsEditForm } from "./components/productsEditForm";

export default async function ProductsEditPage({
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

  const collections = await prismadb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.productColor.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.productSize.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <ProductsEditForm
        product={product}
        collections={collections}
        colors={colors}
        sizes={sizes}
      />
    </>
  );
}
