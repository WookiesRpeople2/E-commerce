"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Collections = {
  id: string;
  collectionName: string;
};

export const columns: ColumnDef<Collections>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-xl">Id</div>,
  },
  {
    accessorKey: "collectionName",
    header: () => <div className="text-xl">Name</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
