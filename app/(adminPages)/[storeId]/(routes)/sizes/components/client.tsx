"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { ProductSize } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";

type ColorsClientProps = {
  sizes: ProductSize[];
};

export const ColorsClient: React.FC<ColorsClientProps> = ({ sizes }) => {
  const router = useRouter();
  const params = useParams();

  const onNew = () => {
    router.push(`/${params.storeId}/sizes/create`);
  };

  return (
    <div>
      <div className="px-4">
        <Heading title="Sizes" discreption="see the sizes in your store" />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable onNew={onNew} filter="size" columns={columns} data={sizes} />
      </div>
    </div>
  );
};
