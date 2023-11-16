"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { useCollections } from "@/hooks/useCollections";
import { Collection, ProductGroup } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./columns";

interface GroupeClientProps {
  groupes: ProductGroup[];
}

export const GroupeClient: React.FC<GroupeClientProps> = ({ groupes }) => {
  const router = useRouter();
  const params = useParams();

  const onNew = () => {
    router.push(`/${params.storeId}/groupes/create`);
  };

  return (
    <div>
      <div className="px-4">
        <Heading
          title="Groupes"
          discreption="you can link products here together in a groupe, like a shoe that has the same name and brandd you can make a groupe called Jordon for example and it will hold both shoes"
        />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable
          onNew={onNew}
          filter="groupe"
          columns={columns}
          data={groupes}
        />
      </div>
    </div>
  );
};
