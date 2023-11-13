"use client";

import { ColorsCircle } from "@/components/customUi/colorsCircle";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./action";

export type Products = {
  id: string;
  productName: string;
  colors: string[];
  sizes: string[];
  featured: boolean;
  price: number;
  diliveryPrice: number;
  collectionName: string | null;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "productName",
    header: () => <div className="text-xl">Name</div>,
  },
  {
    accessorKey: "colors",
    header: () => <div className="text-xl">Colors</div>,
    cell: ({ row }) => {
      const colors = row.getValue("colors") as [];
      return (
        <div className="flex space-x-2">
          {colors.map((color, colorIndex) => (
            <ColorsCircle key={colorIndex} color={color} />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "sizes",
    header: () => <div className="text-xl">Sizes</div>,
  },
  {
    accessorKey: "featured",
    header: () => <div className="text-xl">Featured</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-xl">Price</div>,
  },
  {
    accessorKey: "diliveryPrice",
    header: () => <div className="text-xl">Delivery</div>,
  },
  {
    accessorKey: "collectionName",
    header: () => <div className="text-xl">Collection</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction data={row.original} />,
  },
];
