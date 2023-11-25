"use client";

import { cn } from "@/lib/utils";
import { MenuSquare, XSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type MobileNavbarProps = {
  links: {
    link: string;
    label?: string;
    clicked: boolean;
  }[];
};

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuSquare className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col items-center text-xl space-y-10">
            {links.map((link) => (
              <Link
                onClick={() => setOpen(false)}
                key={link.label}
                href={link.link}
                className={cn(
                  "first:text-3xl first:font-semibold first:opacity-100 first:text-black dark:first:text-white",
                  link.clicked ? "opacity-100" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
