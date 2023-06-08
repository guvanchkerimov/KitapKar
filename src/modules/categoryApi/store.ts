import { create } from "zustand";
import axios from "axios";

type CategoryApi = {
    id: number;
    name: string;
};

type CategoryStore = {
    categoryApi: CategoryApi[];
    fetchCategories: Function;
    activeCategory: { id: number; name: string };
    activeCategoryIdFn: Function;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
    categoryApi: [],
    activeCategory: { id: 0, name: "" },
    activeCategoryIdFn: (id: number, name: string) =>
        set({ activeCategory: { id, name } }),

    fetchCategories: async () => {
        const result = await axios.get("http://localhost:3004/category");
        set({ categoryApi: result.data });
    },
}));
