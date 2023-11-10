import { CreateProductForm } from "./components/createProductForm";
import prismadb from "@/lib/prismadb";

export default async function ColorsCreatePage({
  params,
}: {
  params: { storeId: string };
}) {
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
      <CreateProductForm
        collections={collections}
        colors={colors}
        sizes={sizes}
      />
    </>
  );
}
