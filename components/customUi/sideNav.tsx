"use client";

import { Collection } from "@prisma/client";
import { useCallback, useState } from "react";
import { Combobox } from "./combobox";

type SideNavProps = {
  data?: Collection[];
};

export const SideNav: React.FC<SideNavProps> = ({ data }) => {
  const [value, setValue] = useState("");

  const viewCollection = useCallback((selectedValue: string) => {
    setValue(selectedValue);
    const collectionData = data?.find(
      (collection) => selectedValue === collection.collectionName.toLowerCase()
    );
    console.log(collectionData);
  }, []);

  return (
    <div className="sticky rounded-md shadow-md h-80 w-80 p-4 ml-2 mt-2 space-y-10">
      {(data as Collection[]).length > 0 ? (
        <Combobox
          btnTitle="View collections"
          values={(data as Collection[]).map((collection) => ({
            name: collection.collectionName.toLowerCase(),
            label: collection.collectionName,
          }))}
          selectedValue={value}
          onChange={viewCollection}
        />
      ) : (
        <span>Can not find any collections</span>
      )}
    </div>
  );
};
