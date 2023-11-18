import { ProductColor } from "@prisma/client";
import { create } from "zustand";

type State = {
  color: ProductColor[];
};

type Action = {
  updateColors: (color: State["color"]) => void;
  deleteColor: (id: string) => void;
};

export const useColors = create<State & Action>((set) => ({
  color: [],
  updateColors: (color) => set(() => ({ color: color })),
  deleteColor: (id) =>
    set((state) => ({
      color: state.color.filter((item) => item.id !== id),
    })),
}));
