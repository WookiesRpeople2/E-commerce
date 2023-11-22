"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export const ToggleTheme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Toggle onPressedChange={(pressed) => setTheme(pressed ? "light" : "dark")}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Toggle>
  );
};
