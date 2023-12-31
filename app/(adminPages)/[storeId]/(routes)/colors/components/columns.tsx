"use client";

import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Colors = {
  id: string;
  color: string;
};

export const columns: ColumnDef<Colors>[] = [
  {
    accessorKey: "preview",
    header: () => <div className="lg:text-xl">Preview</div>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1">
          <ColorsCircle color={row.getValue("color")} />
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: () => <div className="lg:text-xl">Colors</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
