"use client";

import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Sizes = {
  id: string;
  size: string;
};

export const columns: ColumnDef<Sizes>[] = [
  {
    accessorKey: "id",
    header: () => <div className="lg:text-xl">Id</div>,
  },
  {
    accessorKey: "size",
    header: () => <div className="lg:text-xl">Size</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
