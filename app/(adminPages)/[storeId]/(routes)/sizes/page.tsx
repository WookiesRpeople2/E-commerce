import prismadb from "@/lib/prismadb";
import { ColorsClient } from "./components/client";

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prismadb.productSize.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div>
      <ColorsClient sizes={sizes} />
    </div>
  );
}
