"use client";

import { AlerteModel } from "@/components/customUi/alerteModel";
import { PaymentModel } from "@/components/customUi/paymentModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { BookOpen, ClipboardCopyIcon, MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Payments } from "./columns";

interface RowActionProps {
  data: Payments;
}

export const RowAction: React.FC<RowActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Id copied to clipboard");
  };

  const onView = () => {
    router.push(`/${params.storeId}/payments/${data.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopy}>
            <ClipboardCopyIcon className="h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onView}>
            <BookOpen className="w-4 h-4" />
            More information
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
