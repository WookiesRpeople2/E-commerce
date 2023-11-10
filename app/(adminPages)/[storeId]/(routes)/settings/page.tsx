import { SettingsForm } from "./components/settingsForm";
import prismadb from "@/lib/prismadb";
import { SettingsClient } from "./components/client";

export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="px-5">
      <SettingsClient status={store?.status} />
    </div>
  );
}
