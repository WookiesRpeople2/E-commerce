"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ImagePreviewProps = {
  image: string;
  className?: string;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  className,
}) => {
  return (
    <Card className={cn("relative aspect-w-1 aspect-h-1", className)}>
      <CardContent>
        <div className="w-full h-full">
          <Image
            fill
            src={image}
            alt="Profile image"
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
