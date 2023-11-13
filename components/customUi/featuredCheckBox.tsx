"use client";

import { Checkbox } from "@/components/ui/checkbox";

type FeaturedCheckBoxProps = {
  check?: boolean;
  onCheckChange: () => void;
};

export const FeaturedCheckBox: React.FC<FeaturedCheckBoxProps> = ({
  check,
  onCheckChange,
}) => {
  return (
    <div className="flex flex-col justify-center shadow-md p-2">
      <div className="flex items-center space-x-1">
        <Checkbox
          id="featured"
          checked={check}
          onCheckedChange={onCheckChange}
        />
        <label htmlFor="featured">Make this a featured product</label>
      </div>
      <div>
        <label className="text-muted-foreground text-sm">
          This will put this product on the featured section of your store
        </label>
      </div>
    </div>
  );
};
