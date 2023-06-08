import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, TextField, Container, Button } from "@mui/material";
import "./HeaderTwo.css";
import { useTranslation } from "react-i18next";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { useCategoryStore } from "../../modules/categoryApi/store";
import { useBooksStore } from "../../modules/booksApi/store";
import { useIsTrueSearch } from "../../modules/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));
type IProps = {
    disabled?: boolean;
};
const HeaderTwo = (props: IProps) => {
    let filterBook = useBooksStore((state) => state.filterBook);
    const categoryApi = useCategoryStore((state) => state.categoryApi);
    const fetchCategories = useCategoryStore((state) => state.fetchCategories);
    const activeCategoryIdFn = useCategoryStore(
        (state) => state.activeCategoryIdFn
    );
    const [search, setSearch] = useState("");
    const fetchBooks = useBooksStore((state) => state.fetchBooks);
    const isTrueSearchFunction = useIsTrueSearch(
        (state) => state.isTrueSearchFunction
    );

    function changeCategory(id: number, name: string) {
        activeCategoryIdFn(id, name);
    }

    function handleBook() {
        isTrueSearchFunction(false);
        fetchBooks();
    }

    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const searchBook = (e: any) => {
        if (search.trim()) {
            isTrueSearchFunction(true);
            filterBook(search.toString());
            setSearch("");
        } else {
            e.preventDefault();
            toast.warning("Kitabyň adyny ýazyň", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        fetchCategories();
        // console.log(Object.values(param)[0]);
    }, []);

    return (
        <Stack sx={{ border: "1px solid lightGray" }}>
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Stack direction={"row"}>
                    <Link
                        to={"/books"}
                        onClick={() => handleBook()}
                        style={{ textDecoration: "none" }}
                    >
                        <Button className="linkHeader">{t("books")}</Button>
                    </Link>
                    <div>
                        <Button
                            className="linkHeader"
                            id="demo-customized-button"
                            aria-controls={
                                open ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            disableElevation
                            onClick={handleClick}
                        >
                            {t("category")}
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {categoryApi.map((elem, index) => {
                                return (
                                    <Link
                                        key={index + 1}
                                        to={`/category/${elem.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <MenuItem
                                            onClick={() =>
                                                changeCategory(
                                                    elem.id,
                                                    elem.name
                                                )
                                            }
                                            key={index + 1}
                                        >
                                            {t(elem.name)}
                                        </MenuItem>
                                    </Link>
                                );
                            })}
                        </StyledMenu>
                    </div>

                    <Link to={"/profile"}>
                        <Button className="linkHeader">{t("profile")}</Button>
                    </Link>
                    <Link to={"/library"}>
                        <Button className="linkHeader">{t("libraries")}</Button>
                    </Link>
                </Stack>
                <Stack
                    sx={{ py: "2px", height: "40px" }}
                    direction={"row"}
                    alignItems={"center "}
                >
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        variant="filled"
                        label={t("search")}
                    />
                    <Link to={"/books"} style={{ height: "100%" }}>
                        <Button
                            sx={{ color: "white", height: "100%" }}
                            variant="contained"
                            onClick={(e) => searchBook(e)}
                        >
                            {t("search")}
                        </Button>
                        <ToastContainer></ToastContainer>
                    </Link>
                </Stack>
            </Container>
        </Stack>
    );
};

export default HeaderTwo;
