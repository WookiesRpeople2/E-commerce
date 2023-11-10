"use client";
import { Heading } from "@/components/customUi/heading";
import { SettingsForm } from "./settingsForm";
import { StoreStatus } from "./storeStatus";

type SettingsClient = {
  status?: string | null;
};

export const SettingsClient: React.FC<SettingsClient> = ({ status }) => {
  return (
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
      <div className="py-4">
        <Heading
          title="Set the state of your store"
          discreption="please select wather your store is open or not"
        />
        <div className="flex justify-center flex-col items-center">
          <StoreStatus status={status} />
        </div>
      </div>
    </div>
  );
};
