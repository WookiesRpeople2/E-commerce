"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { Product, ProductColor, ProductGroup } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { columns, Products } from "./columns";

type ProductsHomeClientProps = {
  products: Products[];
  groupes: ProductGroup[];
};

export const ProductsHomeClient: React.FC<ProductsHomeClientProps> = ({
  products,
  groupes,
}) => {
  const params = useParams();
  const router = useRouter();

  const onNew = () => {
    router.push(`/${params.storeId}/products/create`);
  };

  return (
    <div className="px-4">
      <Heading title="Products" discreption="See your products in the store" />
      <div className="container max-w-5xl py-10">
        <DataTable
          onNew={onNew}
          filter="productName"
          columns={columns}
          data={products}
          values={groupes}
        />
      </div>
    </div>
  );
};
