import prismadb from "@/lib/prismadb";
import { group } from "console";
import { redirect } from "next/navigation";
import { GroupeEditForm } from "./components/groupeEditForm";

export default async function GroupeEditPage({
  params,
}: {
  params: { storeId: string; groupeId: string };
}) {
  const groupe = await prismadb.productGroup.findFirst({
    where: {
      id: params.groupeId,
      storeId: params.storeId,
    },
  });

  return (
    <>
      <GroupeEditForm data={groupe} />
    </>
  );
}
