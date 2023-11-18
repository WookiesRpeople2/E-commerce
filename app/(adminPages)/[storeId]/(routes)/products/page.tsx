import prismadb from "@/lib/prismadb";
import { ProductsHomeClient } from "./components/client";
import { Products } from "./components/columns";

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

  const colleactions = await prismadb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const groupes = await prismadb.productGroup.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const fillteredProducts: Products[] = products.map((product) => {
    const relatedColor = colors.find((color) => color.id === product.colorId);
    const relatedSize = sizes.find((size) => size.id === product.sizeId);
    const relatedGroupe = groupes.find(
      (groupe) => groupe.id === product.groupeId
    );
    const relatedCollection = colleactions.find(
      (collection) => collection.id === product.collectionId
    );
    return {
      ...product,
      colors: relatedColor?.color || "",
      sizes: relatedSize?.size || "",
      groupe: relatedGroupe?.groupe || "",
      collectionName: relatedCollection?.collectionName || null,
    };
  });

  return (
    <>
      <ProductsHomeClient products={fillteredProducts} groupes={groupes} />
    </>
  );
}
