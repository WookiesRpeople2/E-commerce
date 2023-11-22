import { Collection } from "@prisma/client";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type State = {
  collection: Collection[];
};

type Actions = {
  updateCollections: (collection: State["collection"]) => void;
  deleteCollection: (id: string) => void;
};

export const useCollections = create<State & Actions>()(
  immer((set) => ({
    collection: [],
    updateCollections: (collection) => set(() => ({ collection: collection })),
    deleteCollection: (id) =>
      set((state) => ({
        collection: state.collection.filter((item) => item.id !== id),
      })),
  }))
);
