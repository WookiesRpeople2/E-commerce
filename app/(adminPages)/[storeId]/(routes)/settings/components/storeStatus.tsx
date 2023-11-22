"use client";

import axios from "axios";
import { AlerteModel } from "@/components/customUi/alerteModel";
import { Button } from "@/components/ui/button";
import { AlertTriangle, DoorClosed, DoorOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type StoreStatusProps = {
  status?: string | null;
};

type Buttons = {
  description: string;
  variant:
    | "default"
    | "destructive"
    | "link"
    | "outline"
    | "secondary"
    | "ghost";
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
};

export const StoreStatus: React.FC<StoreStatusProps> = ({ status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storeStatus, setStoreStatus] = useState("");
  const params = useParams();
  const router = useRouter();

  const buttons: Buttons[] = [
    {
      description: "This will change the status of your store to Open",
      variant: "default",
      label: "Open",
      value: "open",
      icon: <DoorOpen className="w-4 -h4" />,
    },
    {
      description:
        "This will change the status of your store to under maintence",
      variant: "default",
      label: "Maintenance",
      value: "maintenance",
      icon: <AlertTriangle className="w-4 h-4" />,
      className:
        "bg-yellow-400 hover:bg-yellow-300 text-destructive-foreground",
    },
    {
      description: "This will change the status of your store to Closed",
      variant: "destructive",
      label: "Closed",
      value: "closed",
      icon: <DoorClosed className="w-4 h-4" />,
    },
  ];

  const onContinue = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}/settings/status`, {
        status: storeStatus,
      });
      router.refresh();
      toast.success("The status of your store was succsessfully updated");
    } catch (error) {
      toast.error("an Error has occured");
    } finally {
      setIsLoading(false);
    }
  }, [storeStatus]);

  return (
    <>
      {status && (
        <div className="text-lg text-muted-foreground mb-3">
          The current Status of your store is:
          <span className="text-xl font-semibold text-black capitalize ml-1 dark:text-white">
            {status}
          </span>
        </div>
      )}
      <div className="flex items-center space-x-4">
        {buttons.map((button) => (
          <AlerteModel
            key={button.label}
            description={button.description}
            disabled={isLoading}
            onContinue={onContinue}
          >
            <Button
              variant={button.variant}
              onClick={() => setStoreStatus(button.value)}
              className={button.className}
            >
              {button.icon}
              {button.label}
            </Button>
          </AlerteModel>
        ))}
      </div>
    </>
  );
};
