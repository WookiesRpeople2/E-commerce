"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomCard } from "./customCard";

type ImagePreviewProps = {
  image: string;
  className?: string;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  className,
}) => {
  return (
    <CustomCard className={cn("relative aspect-w-1 aspect-h-1", className)}>
      <div className="w-full h-full">
        <Image
          fill
          src={image}
          alt="Profile image"
          className="object-cover w-full h-full"
        />
      </div>
    </CustomCard>
  );
};
