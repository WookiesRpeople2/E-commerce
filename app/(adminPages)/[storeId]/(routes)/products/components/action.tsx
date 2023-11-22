"use client";

import { AlerteModel } from "@/components/customUi/alerteModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/hooks/useProducts";
import axios from "axios";
import { ClipboardCopyIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Products } from "./columns";

interface RowActionProps {
  data: Products;
}

export const RowAction: React.FC<RowActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const { deleteProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Id copied to clipboard");
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/products/${data.id}`);
  };

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}/products/${data.id}`);
      deleteProduct(data.id);
      toast.success("Product Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      <AlerteModel
        description="this action will delete this product, it can not be undone"
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
