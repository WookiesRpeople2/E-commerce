import prismadb from "@/lib/prismadb";
import { CollecionsClient } from "./components/client";

export default async function CollectionsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const collections = await prismadb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <CollecionsClient collections={collections} />
    </div>
  );
}
