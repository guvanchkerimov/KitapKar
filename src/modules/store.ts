import { create } from "zustand";

type istureType = {
    isTrueSearch: boolean;
    isTrueSearchFunction: Function;
};

export const useIsTrueSearch = create<istureType>((set) => ({
    isTrueSearch: false,
    isTrueSearchFunction: (chek: boolean) => set({ isTrueSearch: chek }),
}));
