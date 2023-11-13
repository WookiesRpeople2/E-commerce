"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ProductColor } from "@prisma/client";
import { cn } from "@/lib/utils";

type ColorsPreviewProps = {
  colorNames: ProductColor[] | null;
  value: string[];
  onChange: (value: string[]) => void;
};

export const ColorsButton: React.FC<ColorsPreviewProps> = ({
  colorNames,
  value,
  onChange,
}) => {
  const handleClickColor = (currentColor: string) => {
    const newValue = value.includes(currentColor)
      ? value.filter((size) => size !== currentColor)
      : [...value, currentColor];

    onChange(newValue);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colorNames &&
        colorNames.map((colorName) => (
          <Button
            type="button"
            variant={value.includes(colorName.color) ? "default" : "secondary"}
            className={cn(
              value.includes(colorName.color)
                ? "text-white"
                : "text-muted-foreground"
            )}
            onClick={() => handleClickColor(colorName.color)}
            key={colorName.id}
          >
            <div className="px-1 flex justify-center items-center space-x-1">
              <ColorsCircle color={colorName.color} />

              <span className="text-sm">{colorName.color}</span>
            </div>
          </Button>
        ))}
    </div>
  );
};
