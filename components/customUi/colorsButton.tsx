"use client";

import { Button } from "@/components/ui/button";
import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ProductColor } from "@prisma/client";
import { cn } from "@/lib/utils";

type ColorsPreviewProps = {
  colorNames: ProductColor[] | null;
  value: string;
  onChange: (value: string) => void;
};

export const ColorsButton: React.FC<ColorsPreviewProps> = ({
  colorNames,
  value,
  onChange,
}) => {
  const handleClickColor = (currentColor: string) => {
    onChange(currentColor);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colorNames && colorNames.length > 0 ? (
        colorNames.map((colorName) => (
          <Button
            type="button"
            variant={value.includes(colorName.id) ? "default" : "secondary"}
            className={cn(
              value.includes(colorName.id)
                ? "text-white dark:text-black"
                : "text-muted-foreground"
            )}
            onClick={() => handleClickColor(colorName.id)}
            key={colorName.id}
          >
            <div className="px-1 flex justify-center items-center space-x-1">
              <ColorsCircle color={colorName.color} />

              <span className="text-sm">{colorName.color}</span>
            </div>
          </Button>
        ))
      ) : (
        <div className="text-muted-foreground text-sm">
          No colors found please create some
        </div>
      )}
    </div>
  );
};
