"use client";

import { DashboardCard } from "@/components/customUi/dashboardCard";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

export const StoreApiCard = () => {
  const params = useParams();

  const onCopy = () => {
    navigator.clipboard.writeText(
      `https://e-commerce-rho-three-62.vercel.app/api/stores/${params.storeId}`
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <DashboardCard
      title="The url for your backend"
      discription="use this link to connect your stores client page"
      className="w-full mb-0 flex justify-center items-center flex-col lg:max-w-lg"
    >
      <div className="text-sm">
        https://e-commerce-rho-three-62.vercel.app/api/stores/{params.storeId}
        <div className="mt-5 lg:text-right">
          <Button size="icon" onClick={onCopy}>
            <ClipboardCopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
