import { ProductSize } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  size: ProductSize[];
};

type Action = {
  updateSizes: (size: State["size"]) => void;
  deleteSize: (id: string) => void;
};

export const useSizes = create<State & Action>()(
  immer((set) => ({
    size: [],
    updateSizes: (size) => set(() => ({ size: size })),
    deleteSize: (id) =>
      set((state) => ({
        size: state.size.filter((item) => item.id !== id),
      })),
  }))
);
