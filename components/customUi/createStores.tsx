"use client";

import { Store } from "@prisma/client";
import { StoreCombobox } from "./storeCombobox";

type CreateStoreProps = {
  currentStoreName: string;
  stores: Store[];
  handleOnClick: () => void;
  handleOnChange: (value: string) => void;
};

export const CreateStore: React.FC<CreateStoreProps> = ({
  currentStoreName,
  stores,
  handleOnChange,
  handleOnClick,
}) => {
  return (
    <>
      <StoreCombobox
        store={currentStoreName?.toLowerCase()}
        values={(stores as Store[]).map((store) => ({
          name: store.storeName.toLowerCase(),
          label: store.storeName,
        }))}
        onChange={(value) => handleOnChange(value as string)}
        onClick={handleOnClick}
      />
    </>
  );
};
