"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/Heading";
import { ProductColor } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";

type ColorsClientProps = {
  colors: ProductColor[];
};

export const ColorsClient: React.FC<ColorsClientProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams();

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
          data={colors}
        />
      </div>
    </div>
  );
};
