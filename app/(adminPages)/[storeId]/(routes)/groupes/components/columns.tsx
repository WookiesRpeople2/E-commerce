"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Groupes = {
  id: string;
  groupe: string;
};

export const columns: ColumnDef<Groupes>[] = [
  {
    accessorKey: "id",
    header: () => <div className="lg:text-xl">Id</div>,
  },
  {
    accessorKey: "groupe",
    header: () => <div className="lg:text-xl">Group</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
