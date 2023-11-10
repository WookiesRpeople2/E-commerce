import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { EditProductSizeForm } from "./components/editProductSizeForm";

export default async function ColorsAddEditPage({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) {
  const sizes = await prismadb.productSize.findFirst({
    where: {
      id: params.sizeId,
      storeId: params.storeId,
    },
  });

  if (!sizes) {
    redirect(`/${params.storeId}/sizes`);
  }

  return (
    <div>
      <EditProductSizeForm data={sizes} />
    </div>
  );
}
