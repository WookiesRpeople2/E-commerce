"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CustomCard {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode | string;
}

export const CustomCard: React.FC<CustomCard> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
