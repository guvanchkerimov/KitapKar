import axios from "axios";
import { create } from "zustand";
export type BookType = {
    id: number;
    title: string;
    author: string;
    img_url: string;
    description?: string;
    language?: string;
    category?: number;
    publish_year?: number;
    pages?: number;
    rent_price: number;
    on_rent?: boolean;
    price: number;
    owner_id?: number;
};

export type newBook = {
    id: number;
    title: string;
    author: string;
    price: number;
    description?: string;
    rent_price: number;
    img_url: string;
    on_rent: boolean;
};

type BookStoreType = {
    books: BookType[];
    filterBookResult: BookType[];
    categoryData: BookType[];
    booksOnRent: BookType[];
    errors: string[];
    isLoading: boolean;
    fetchBooks: Function;
    fetchBooksCategory: Function;
    activeBook: BookType;
    fetchActiveBookFn: Function;
    activeBookId: any;
    activeBookIdFn: Function;
    filterBook: Function;
    myBooks: [];
    fetchMyBooks: Function;
    fetchBooksOnRent: Function;
};

export const useBooksStore = create<BookStoreType>((set) => ({
    books: [],
    filterBookResult: [],
    categoryData: [],
    booksOnRent: [],
    myBooks: [],
    errors: [],
    isLoading: false,
    activeBookId: 0,
    activeBook: {
        id: 0,
        title: "",
        author: "",
        category: 0,
        description: "",
        img_url: "",
        language: "",
        on_rent: false,
        owner_id: 0,
        pages: 0,
        price: 0,
        publish_year: 0,
        rent_price: 0,
    },
    filterBook: (value: string) =>
        set((state) => ({
            filterBookResult: state.books.filter((elem: BookType) =>
                elem.title.toLowerCase().includes(value.toLowerCase())
            ),
        })),

    fetchBooks: async () => {
        const result = await axios.get("http://localhost:3004/books");
        set({ books: result.data });
    },
    fetchBooksCategory: async (id: number) => {
        const result = await axios.get("http://localhost:3004/books", {
            params: {
                category: id,
            },
        });
        set({ categoryData: result.data });
    },
    fetchBooksOnRent: async (chek: boolean) => {
        const result = await axios.get("http://localhost:3004/books", {
            params: {
                on_rent: chek,
            },
        });
        set({ booksOnRent: result.data });
    },

    fetchMyBooks: async () => {
        const result = await axios.get("http://localhost:3004/myBooks");
        set({ myBooks: result.data });
    },

    fetchActiveBookFn: async (id: number) => {
        const result = await axios.get("http://localhost:3004/books", {
            params: {
                id: id,
            },
        });
        set({ activeBook: result.data[0] });
    },
    activeBookIdFn: (id: number) => set({ activeBookId: id }),
}));
