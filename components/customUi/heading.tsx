"use client";

import { Separator } from "@/components/ui/Separator";

interface HeadingProps {
  title: string;
  discreption: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, discreption }) => {
  return (
    <div className="h-32 space-y-4 mt-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-sm text-muted-foreground">{discreption}</h2>
      <Separator />
    </div>
  );
};
