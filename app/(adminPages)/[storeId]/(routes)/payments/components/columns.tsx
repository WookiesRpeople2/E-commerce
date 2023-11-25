"use client";

import { format, isToday } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Payments = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  quantity: number;
  createdAt: Date;
  productName: string;
  productImages: string[];
  price: number;
};

export const columns: ColumnDef<Payments>[] = [
  {
    accessorKey: "phone",
    header: () => <div className="lg:text-xl">Phone number</div>,
  },
  {
    accessorKey: "address",
    header: () => <div className="lg:text-xl">Address</div>,
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="lg:text-xl">Paid</div>,
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaid") ? "True" : "False";
      return <div className="text-blue-700">{isPaid}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="lg:text-xl">Quantity</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="lg:text-xl">Added</div>,
    cell: ({ row }) => {
      const date = isToday(row.getValue("createdAt"))
        ? "Today"
        : format(row.getValue("createdAt"), "dd-MM-yyy");
      return <div>{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
