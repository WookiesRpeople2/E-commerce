import { ProductGroup } from "@prisma/client";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type State = {
  groupe: ProductGroup[];
};

type Action = {
  updateGroupes: (groupe: State["groupe"]) => void;
  deleteGroupe: (id: string) => void;
};

export const useGroupes = create<State & Action>()(
  immer((set) => ({
    groupe: [],
    updateGroupes: (groupe) => set(() => ({ groupe: groupe })),
    deleteGroupe: (id) =>
      set((state) => ({
        groupe: state.groupe.filter((item) => item.id !== id),
      })),
  }))
);
