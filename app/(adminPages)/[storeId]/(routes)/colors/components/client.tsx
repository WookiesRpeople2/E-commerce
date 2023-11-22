"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { useColors } from "@/hooks/useColors";
import { ProductColor } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./columns";

type ColorsClientProps = {
  colors: ProductColor[];
};

export const ColorsClient: React.FC<ColorsClientProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams();
  const { color, updateColors } = useColors();

  useEffect(() => {
    updateColors(colors);
  }, []);

  const onNew = () => {
    router.push(`/${params.storeId}/colors/create`);
  };

  return (
    <div>
      <div className="px-4">
        <Heading title="Colors" discreption="see the colors in your store" />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable
          onNew={onNew}
          filter="color"
          columns={columns}
          data={color}
        />
      </div>
    </div>
  );
};
