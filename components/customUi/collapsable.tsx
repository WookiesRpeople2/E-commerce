"use client";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollasableProps {
  trigger: string;
  children: React.ReactNode;
}

export const Collapsable: React.FC<CollasableProps> = ({
  trigger,
  children,
}) => {
  return (
    <Collapsible>
      <div className="flex items-center justify-between space-x-4">
        {trigger}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};
