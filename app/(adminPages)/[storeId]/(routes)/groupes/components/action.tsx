"use client";

import { AlerteModel } from "@/components/customUi/alerteModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGroupes } from "@/hooks/useGroupes";
import axios from "axios";
import { ClipboardCopyIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Groupes } from "./columns";

interface RowActionProps {
  data: Groupes;
}

export const RowAction: React.FC<RowActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteGroupe } = useGroupes();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Id copied to clipboard");
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/groupes/${data.id}`);
  };

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}/groupes/${data.id}`);
      router.refresh();
      deleteGroupe(data.id);
      toast.success("Groupe Deleted");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      <AlerteModel
        description="this action will delete this groupe, it can not be undone"
        disabled={isLoading}
        onContinue={onDelete}
        onCancel={() => setOpen(false)}
        open={open}
        onOpenChange={() => setOpen}
      />
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
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
