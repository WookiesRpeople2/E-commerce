"use client";

import { cn } from "@/lib/utils";
import { MenuSquare, XSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type MobileNavbarProps = {
  links: {
    link: string;
    label?: string;
    clicked: boolean;
  }[];
};

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ links }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
        <MenuSquare className="w-4 h-4" />
      </Button>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 bg-opacity-100 z-50">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu}>
              <XSquare />
            </button>
          </div>
          <div className="flex flex-col items-center text-xl space-y-10">
            {links.map((link) => (
              <Link
                key={link.label}
                onClick={toggleMobileMenu}
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
        </div>
      )}
    </>
  );
};
