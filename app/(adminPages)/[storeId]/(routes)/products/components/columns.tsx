"use client";

import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Products = {
  id: string;
  productName: string;
  colors: string;
  sizes: string;
  price: number;
  diliveryPrice: number;
  quantity: number;
  groupe: string;
  collectionName: string | null;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "productName",
    header: () => <div className="lg:text-xl">Name</div>,
  },
  {
    accessorKey: "colors",
    header: () => <div className="lg:text-xl">Color</div>,
    cell: ({ row }) => {
      const color = row.getValue("colors") as string;
      return (
        <div className="flex justify-center space-x-2">
          <ColorsCircle color={color} />
        </div>
      );
    },
  },
  {
    accessorKey: "lg:sizes",
    header: () => <div className="lg:text-xl">Size</div>,
  },
  {
    accessorKey: "lg:price",
    header: () => <div className="lg:text-xl">Price</div>,
  },
  {
    accessorKey: "lg:diliveryPrice",
    header: () => <div className="lg:text-xl">Delivery</div>,
  },
  {
    accessorKey: "lg:quantity",
    header: () => <div className="lg:text-xl">Quantity</div>,
  },
  {
    accessorKey: "lg:collectionName",
    header: () => <div className="lg:text-xl">Collection</div>,
  },
  {
    accessorKey: "lg:groupe",
    header: () => <div className="lg:text-xl">Groupe</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("groupe")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
