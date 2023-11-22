import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type Products = {
  id: string;
  productName: string;
  colors: string;
  sizes: string;
  price: number;
  diliveryPrice: number;
  quantity: number;
  groupe: string;
  collectionName: string | null;
};

type State = {
  product: Products[];
};

type Action = {
  updateProducts: (product: State["product"]) => void;
  deleteProduct: (id: string) => void;
};

export const useProducts = create<State & Action>()(
  immer((set) => ({
    product: [],
    updateProducts: (product) => set(() => ({ product: product })),
    deleteProduct: (id) =>
      set((state) => ({
        product: state.product.filter((item) => item.id !== id),
      })),
  }))
);
