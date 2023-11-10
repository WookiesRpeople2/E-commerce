"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";

type ProductsHomeClientProps = {
  products: Product[];
};

export const ProductsHomeClient: React.FC<ProductsHomeClientProps> = ({
  products,
}) => {
  const params = useParams();
  const router = useRouter();

  const onNew = () => {
    router.push(`/${params.storeId}/products/create`);
  };

  return (
    <div className="px-4">
      <Heading title="Products" discreption="See your products in the store" />
      <div className="container max-w-3xl py-10">
        <DataTable
          onNew={onNew}
          filter="productName"
          columns={columns}
          data={products}
        />
      </div>
    </div>
  );
};
