import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { CollectionEditForm } from "./components/collectionsEditForm";

export default async function CollectionAddEditPage({
  params,
}: {
  params: { storeId: string; collectionId: string };
}) {
  const collection = await prismadb.collection.findFirst({
    where: {
      id: params.collectionId,
      storeId: params.storeId,
    },
  });

  if (!collection) {
    redirect(`/${params.storeId}/collections`);
  }

  return (
    <>
      <CollectionEditForm data={collection} />
    </>
  );
}
