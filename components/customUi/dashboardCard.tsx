"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type DashboardCardProps = {
  title: string;
  discription?: string;
  className?: string;
};

export const DashboardCard: React.FC<
  React.PropsWithChildren<DashboardCardProps>
> = ({ title, discription, className, children }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{discription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
