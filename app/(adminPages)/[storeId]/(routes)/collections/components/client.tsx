"use client";

import { DataTable } from "@/components/customUi/data-table";
import { Heading } from "@/components/customUi/heading";
import { useCollections } from "@/hooks/useCollections";
import { Collection } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./columns";

interface CollecionsClientProps {
  collections: Collection[];
}

export const CollecionsClient: React.FC<CollecionsClientProps> = ({
  collections,
}) => {
  const router = useRouter();
  const params = useParams();
  const { collection, updateCollections } = useCollections();

  useEffect(() => {
    updateCollections(collections);
  }, []);

  const onNew = () => {
    router.push(`/${params.storeId}/collections/create`);
  };

  return (
    <div>
      <div className="px-4">
        <Heading
          title="Collections"
          discreption="See the collections on your store"
        />
      </div>
      <div className="container max-w-3xl py-10">
        <DataTable
          onNew={onNew}
          filter="collectionName"
          columns={columns}
          data={collection}
        />
      </div>
    </div>
  );
};
