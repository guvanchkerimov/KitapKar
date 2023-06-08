import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themeApp } from "./theme/theme";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Index from "./page/Index";
import Book from "./page/Book";
import { useCategoryStore } from "./modules/categoryApi/store";
import Books from "./page/Books";
import Profile from "./page/Profile";
import { useBooksStore } from "./modules/booksApi/store";
import { useIsTrueSearch } from "./modules/store";
import BookStore from "./page/BookStore";

const App = () => {
    const fetchBooks = useBooksStore((state) => state.fetchBooks);
    const activeBookId = useBooksStore((state) => state.activeBookId);
    const activeCategory = useCategoryStore((state) => state.activeCategory);
    const books = useBooksStore((state) => state.books);
    const booksOnRent = useBooksStore((state) => state.booksOnRent);
    const categoryData = useBooksStore((state) => state.categoryData);
    const isTrueSearchFunction = useIsTrueSearch(
        (state) => state.isTrueSearchFunction
    );

    useEffect(() => {
        try {
            fetchBooks();
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        isTrueSearchFunction(false);
    }, [activeCategory, booksOnRent]);
    return (
        <ThemeProvider theme={themeApp}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                        path="books"
                        element={<Books product={books} title={"books"} />}
                    />
                    <Route
                        path="books-on-rent"
                        element={
                            <Books product={booksOnRent} title={"available"} />
                        }
                    />
                    <Route path="library" element={<BookStore />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path={`books/:${activeBookId}`} element={<Book />} />
                    <Route
                        path={`category/:${activeCategory.id}`}
                        element={
                            <Books
                                category={true}
                                product={categoryData}
                                title={activeCategory.name}
                            />
                        }
                    />
                </Routes>
                <Outlet />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
