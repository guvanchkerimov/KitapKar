import { create } from "zustand";
import axios from "axios";

type UsersType = {
    number: number;
    username: string;
    id : number
};

type UsersApi = {
    user: UsersType[];
    fetchUsers: Function;
};
export const useUserStore = create<UsersApi>((set) => ({
    user: [],

    fetchUsers: async () => {
        const result = await axios.get("http://localhost:3004/users");
        set({ user: result.data });
    },
}));
