"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { Payment, PaymentItems, Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { columns, Payments } from "./columns";

type PaymentIdClientProps = {
  payments: Payment[];
  paymentItems: PaymentItems[];
  products: Product[];
};

export const PaymentIdClient: React.FC<PaymentIdClientProps> = ({
  payments,
  paymentItems,
  products,
}) => {
  const router = useRouter();
  const params = useParams();

  const formattedPayments: Payments = paymentItems.map((item) => {
    const payment = payments.find((pay) => pay.id === item.paymentId);
    const product = products.find((prod) => prod.id === item.productId);
    return {
      ...payment,
      productName: product?.productName,
      productImages: product?.productImages,
      price: product?.price,
    };
  });

  return (
    <div>
      <div className="px-4">
        <Heading
          title="Payments"
          discreption="see the payments in your store"
        />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable
          filter="address"
          columns={columns}
          data={formattedPayments}
        />
      </div>
    </div>
  );
};
