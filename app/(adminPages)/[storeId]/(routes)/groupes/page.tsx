import prismadb from "@/lib/prismadb";
import { GroupeClient } from "./components/client";

export default async function GroupePage({
  params,
}: {
  params: { storeId: string };
}) {
  const groupes = await prismadb.productGroup.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <GroupeClient groupes={groupes} />
    </div>
  );
}
