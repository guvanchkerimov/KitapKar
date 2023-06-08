import React from "react";
import { Container, Stack, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { useBooksStore } from "../../modules/booksApi/store";
const Header = () => {
    const fetchBooks = useBooksStore((state) => state.fetchBooks);
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        window.localStorage.setItem("lng", lng);
    };

    return (
        <Stack
            sx={{
                height: "80px",
                bgcolor: "primary.main",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Link to={"/"}>
                    <Button
                        onClick={() => fetchBooks()}
                        sx={{ width: "150px", height: "100%" }}
                    >
                        <img
                            style={{ width: "100%", height: "100%" }}
                            src="/image/l.png"
                            alt="logo"
                        />
                    </Button>
                </Link>
                <Stack direction={"row"} alignItems={"center"}>
                    <Button
                        onClick={() => changeLanguage("tm")}
                        sx={{ height: "45px" }}
                    >
                        <img
                            style={{ height: "100%" }}
                            src="/image/flags/tm.png"
                            alt="tm"
                        />
                    </Button>
                    <Button
                        onClick={() => changeLanguage("ru")}
                        sx={{ height: "45px" }}
                    >
                        <img
                            style={{ height: "100%" }}
                            src="/image/flags/ru.png"
                            alt="ru"
                        />
                    </Button>
                    <Button
                        onClick={() => changeLanguage("en")}
                        sx={{ height: "45px" }}
                    >
                        <img
                            style={{ height: "100%" }}
                            src="/image/flags/en.png"
                            alt="en"
                        />
                    </Button>
                </Stack>
            </Container>
        </Stack>
    );
};

export default Header;
