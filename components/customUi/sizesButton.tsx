"use client";

import { cn } from "@/lib/utils";
import { ProductSize } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type SizesButtonProps = {
  sizes: ProductSize[] | null;
  value: string[];
  onChange: (value: string[]) => void;
};

export const SizesButton: React.FC<SizesButtonProps> = ({
  sizes,
  value,
  onChange,
}) => {
  const handleClickSize = (currentSize: string) => {
    const newValue = value.includes(currentSize)
      ? value.filter((size) => size !== currentSize)
      : [...value, currentSize];

    onChange(newValue);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sizes &&
        sizes.map((size) => (
          <Button
            type="button"
            variant={value.includes(size.size) ? "default" : "secondary"}
            className={cn(
              value.includes(size.size) ? "text-white" : "text-muted-foreground"
            )}
            onClick={() => handleClickSize(size.size)}
            key={size.id}
          >
            <div className="px-1 flex justify-center items-center space-x-1">
              <span className="text-sm">{size.size}</span>
            </div>
          </Button>
        ))}
    </div>
  );
};
