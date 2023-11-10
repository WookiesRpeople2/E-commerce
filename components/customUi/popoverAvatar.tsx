"use client";

import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const PopoverAvatar = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>
            <Skeleton className="h-12 w-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center space-y-4">
        <Button variant="ghost">Manage your account</Button>
        <Button variant="ghost">Sighn out</Button>
      </PopoverContent>
    </Popover>
  );
};
