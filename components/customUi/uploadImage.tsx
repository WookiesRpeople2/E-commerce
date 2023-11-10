"use clinet";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileImage, Trash } from "lucide-react";
import { CustomCard } from "@/components/customUi/customCard";
import Image from "next/image";

interface UploadImageProps {
  field?: string;
  fieldArray?: string[];
  disabled: boolean;
  onValueChange: (url: string) => void;
  onRemoveValue: () => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  field,
  fieldArray,
  disabled,
  onValueChange,
  onRemoveValue,
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
    <>
      {field && (
        <div className="flex space-x-4">
          <CustomCard className="relative w-72 h-72">
            <div className="w-full">
              <Image
                fill
                src={field}
                alt="Profile image"
                className="object-cover w-full h-full"
              />
            </div>
          </CustomCard>
        </div>
      )}

      {fieldArray && fieldArray.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {fieldArray.map((field, fieldIndex) => (
            <CustomCard
              key={fieldIndex}
              className="relative aspect-w-1 aspect-h-1"
            >
              <div className="w-full h-full">
                <Image
                  fill
                  src={field}
                  alt="Profile image"
                  className="object-cover w-full h-full"
                />
              </div>
            </CustomCard>
          ))}
        </div>
      )}

      <CldUploadWidget onUpload={onUpload} uploadPreset="azwbsuiu">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <div className="space-x-4">
              <Button className="mt-5" disabled={disabled} onClick={onClick}>
                <FileImage className="mr-auto w-4 h-4" />
                Upload an Image
              </Button>
              {(field || (fieldArray && fieldArray?.length > 0)) && (
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={disabled}
                  onClick={onRemoveValue}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
