"use client";

import { cn } from "@/lib/utils";
import { ProductSize } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type SizesButtonProps = {
  sizes: ProductSize[] | null;
  value: string;
  onChange: (value: string) => void;
};

export const SizesButton: React.FC<SizesButtonProps> = ({
  sizes,
  value,
  onChange,
}) => {
  const handleClickSize = (currentSize: string) => {
    onChange(currentSize);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sizes && sizes.length > 0 ? (
        sizes.map((size) => (
          <Button
            type="button"
            variant={value.includes(size.id) ? "default" : "secondary"}
            className={cn(
              value.includes(size.id)
                ? "text-white dark:text-black"
                : "text-muted-foreground"
            )}
            onClick={() => handleClickSize(size.id)}
            key={size.id}
          >
            <div className="px-1 flex justify-center items-center space-x-1">
              <span className="text-sm">{size.size}</span>
            </div>
          </Button>
        ))
      ) : (
        <div className="text-muted-foreground text-sm">
          No Sizes Found Please create some
        </div>
      )}
    </div>
  );
};
