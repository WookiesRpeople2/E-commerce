"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AvatarEdit } from "@/components/customUi/avatarEdit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Pen, Pencil } from "lucide-react";

type AccountImageUploadProps = {
  field: string;
  disabled: boolean;
  onValueChange: (url: string) => void;
};

export const AccountImageUpload: React.FC<AccountImageUploadProps> = ({
  field,
  disabled,
  onValueChange,
}) => {
  const [isMounted, setIsMonted] = useState(false);

  useEffect(() => {
    setIsMonted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (url: any) => {
    onValueChange(url.info.url);
  };

  return (
    <div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="azwbsuiu">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return <AvatarEdit field={field} onClick={onClick} />;
        }}
      </CldUploadWidget>
    </div>
  );
};
