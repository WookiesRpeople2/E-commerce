import prismadb from "@/lib/prismadb";
import { ColorsClient } from "./components/client";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.productColor.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <ColorsClient colors={colors} />
    </div>
  );
}
