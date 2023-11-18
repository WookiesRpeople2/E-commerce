"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { AvatarEdit } from "@/components/customUi/avatarEdit";

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
