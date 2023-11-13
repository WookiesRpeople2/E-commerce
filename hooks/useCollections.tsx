import { Collection } from "@prisma/client";
import { create } from "zustand";

type State = {
  collection: Collection[];
};

type Action = {
  updateCollections: (collection: State["collection"]) => void;
  deleteCollection: (id: string) => void;
};

export const useCollections = create<State & Action>((set) => ({
  collection: [],
  updateCollections: (collection) => set(() => ({ collection: collection })),
  deleteCollection: (id) =>
    set((state) => ({
      collection: state.collection.filter((item) => item.id !== id),
    })),
}));
