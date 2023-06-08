import { create } from "zustand";
import axios from "axios";
import { BookType } from "../booksApi/store";

type libraryType = {
    libraryApi: { id: number; name: string; image: string };
};

type BooksStoreLibraryType = {
    libraryApi: libraryType[];
    libraryBooks: BookType[];
    activeIDLibrary: number;
    BooksStoreLibraryFunction: Function;
    BooksStoreCategoryFunction: Function;
};

export const useBooksStoreLibrary = create<BooksStoreLibraryType>((set) => ({
    libraryApi: [],
    libraryBooks: [],
    activeIDLibrary: 0,
    BooksStoreLibraryFunction: async () => {
        const result = await axios.get("http://localhost:3004/bookstore");
        set({ libraryApi: result.data });
    },
    BooksStoreCategoryFunction: async (id: number) => {
        const result = await axios.get("http://localhost:3004/books", {
            params: {
                bookstore: id,
            },
        });
        set({ libraryBooks: result.data });
    },
}));
