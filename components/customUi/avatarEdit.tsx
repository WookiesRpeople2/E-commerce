"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react";

type AvatarEdit = {
  field: string;
  onClick: () => void;
};

export const AvatarEdit: React.FC<AvatarEdit> = ({ field, onClick }) => {
  return (
    <div className="relative w-80 h-80">
      <Avatar className="w-full h-full z-0">
        <AvatarImage src={field || ""} />
        <AvatarFallback>
          <Skeleton />
        </AvatarFallback>
      </Avatar>

      <div
        className="cursor-pointer text-white opacity-0 bg-black hover:opacity-50 z-10 w-full h-full rounded-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        onClick={onClick}
      >
        <Pencil className="h-4 w-4" />
        Edit
      </div>
    </div>
  );
};
