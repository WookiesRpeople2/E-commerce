"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { columns, Payments } from "./columns";

type PaymentsClientProps = {
  payments: Payments[];
};

export const PaymentsClient: React.FC<PaymentsClientProps> = ({ payments }) => {
  return (
    <div>
      <div className="px-4">
        <Heading
          title="Payments"
          discreption="see the payments of your store"
        />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable filter="address" columns={columns} data={payments} />
      </div>
    </div>
  );
};
