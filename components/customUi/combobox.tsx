"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/customUi/Heading";
import { ChevronDown, MousePointerSquare, Trash } from "lucide-react";
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

type ComboboxProps = {
  values: ValueObjects[];
  btnTitle: string;
  exsistingValue?: string;
  onChange: (value: string | null) => void;
};

export const Combobox: React.FC<ComboboxProps> = ({
  values,
  btnTitle,
  exsistingValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(exsistingValue || null);

  const onSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? null : currentValue;

    onChange(newValue);
    setSelectedValue(newValue);

    setIsOpen(false);
  };
  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex space-x-2">
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={isOpen}>
              {selectedValue
                ? values.find((value) => value.name === selectedValue)?.label
                : btnTitle}
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
                      selectedValue === value.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {value.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
