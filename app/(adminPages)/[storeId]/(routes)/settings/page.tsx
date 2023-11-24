import { SettingsForm } from "./components/settingsForm";
import prismadb from "@/lib/prismadb";
import { StoreStatus } from "./components/storeStatus";
import { Heading } from "@/components/customUi/heading";

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
        <div className="flex justify-center items-center flex-col py-10">
          <h1 className="font-bold">Url to connect to your backend</h1>
          <h2>
            {process.env.NEXTAUTH_URL}/api/stores/{params.storeId}
          </h2>
        </div>
        <div>
          <Heading
            title="Set the state of your store"
            discreption="please select wather your store is open or not"
          />
          <div className="flex justify-center flex-col items-center">
            <StoreStatus status={store?.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
