import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { EditProductColorForm } from "./components/editProductColorForm";

export default async function ColorsAddEditPage({
  params,
}: {
  params: { storeId: string; colorId: string };
}) {
  const colors = await prismadb.productColor.findFirst({
    where: {
      id: params.colorId,
      storeId: params.storeId,
    },
  });

  if (!colors) {
    redirect(`/${params.storeId}/colors`);
  }

  return (
    <div>
      <EditProductColorForm data={colors} />
    </div>
  );
}
