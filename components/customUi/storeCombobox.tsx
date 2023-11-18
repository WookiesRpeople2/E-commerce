"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MousePointerSquare,
  PlusCircle,
  Shirt,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandGroup } from "cmdk";
import { cn } from "@/lib/utils";

type ValueObjects = {
  name: string;
  label: string;
};

type StoreComboboxProps = {
  values: ValueObjects[];
  store: string;
  onClick: () => void;
  onChange: (value: string | null) => void;
};

export const StoreCombobox: React.FC<StoreComboboxProps> = ({
  values,
  store,
  onClick,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(store);

  const onSelect = (currentValue: string) => {
    onChange(currentValue);
    // setSelectedValue(currentValue === selectedValue ? store : currentValue);
    setIsOpen(false);
  };
  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex space-x-2">
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={isOpen}>
              <Shirt className="mr-auto h-4 w-4" />
              <span>{store}</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No resualts matched your search</CommandEmpty>
            <CommandGroup>
              {values.map((value) => (
                <CommandItem
                  key={value.name}
                  value={value.name}
                  onSelect={(currentValue) => onSelect(currentValue)}
                >
                  <MousePointerSquare
                    className={cn(
                      "mr-4 h-4 w-4",
                      store === value.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {value.label}
                </CommandItem>
              ))}
              <CommandItem className="flex justify-center items-center">
                <Button
                  variant="outline"
                  onClick={onClick}
                  className="space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create a new store</span>
                </Button>
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
