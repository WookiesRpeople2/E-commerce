"use client";

import { Product } from "@prisma/client";
import { ProductsEditForm } from "./productsEditForm";

type ProductAddEditFormClientProps = {
  data: Product | null;
};

export const ProductAddEditFormClient: React.FC<
  ProductAddEditFormClientProps
> = ({ data }) => {
  return <ProductsEditForm />;
};
