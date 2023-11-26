"use client";

import { AlerteModel } from "@/components/customUi/alerteModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollections } from "@/hooks/useCollections";
import axios from "axios";
import { ClipboardCopyIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Collections } from "./columns";

interface RowActionProps {
  data: Collections;
}

export const RowAction: React.FC<RowActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteCollection } = useCollections();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Id copied to clipboard");
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/collections/${data.id}`);
  };

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/collections/${data.id}`
      );
      router.refresh();
      deleteCollection(data.id);
      toast.success("Collection Deleted");
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      <AlerteModel
        description="this action will delete this collection, it can not be undone IMPORTANT: THIS WILL ALSO DELETE THIS COLLECTIONS FROM THE PRODUCTS THAT HAVE IT SELECTED"
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
        <DropdownMenuContent>
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
