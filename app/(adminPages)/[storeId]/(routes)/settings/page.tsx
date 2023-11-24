import { SettingsForm } from "./components/settingsForm";
import prismadb from "@/lib/prismadb";
import { StoreStatus } from "./components/storeStatus";
import { Heading } from "@/components/customUi/heading";
import { StoreApiCard } from "./components/storeApiCard";

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
      <div>
        <div>
          <Heading
            title="Settings"
            discreption="please edit your stores settings"
          />
          <div className="flex justify-center px-20">
            <SettingsForm />
          </div>
        </div>
        <div className="flex justify-center items-center mt-5 pb-5">
          <StoreApiCard />
        </div>
        <div>
          <Heading
            title="Set the state of your store"
            discreption="please select wather your store is open or not"
          />
          <div className="flex justify-center flex-col items-center pb-5">
            <StoreStatus status={store?.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
