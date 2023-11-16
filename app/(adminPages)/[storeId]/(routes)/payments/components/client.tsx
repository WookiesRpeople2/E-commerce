"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { Payment, Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { columns, Payments } from "./columns";

type PaymentsClientProps = {
  payments: Payment[];
};

export const PaymentsClient: React.FC<PaymentsClientProps> = ({ payments }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="px-4">
        <Heading
          title="Payments"
          discreption="see the payments in your store"
        />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable filter="address" columns={columns} data={payments} />
      </div>
    </div>
  );
};
