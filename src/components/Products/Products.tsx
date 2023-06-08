import { useEffect } from "react";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";
import { useBooksStore, BookType } from "../../modules/booksApi/store";
import { Typography, Container, Grid, Stack, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useIsTrueSearch } from "../../modules/store";
import { useBooksStoreLibrary } from "../../modules/bookstore/store";
import NoResultSearch from "../../loading/NoResultSearch";
type IProps = {
    category?: boolean;
    product: BookType[];
    title: string;
};

const Products = (props: IProps) => {
    const { t } = useTranslation();
    const fetchBooksCategory = useBooksStore(
        (state) => state.fetchBooksCategory
    );
    const filterBookResult = useBooksStore((state) => state.filterBookResult);
    const books = useBooksStore((state) => state.books);
    const isTrueSearch = useIsTrueSearch((state) => state.isTrueSearch);
    const BooksStoreCategoryFunction = useBooksStoreLibrary(
        (state) => state.BooksStoreCategoryFunction
    );

    const param = useParams();
    let resparam = Object.values(param)[0];
    useEffect(() => {
        fetchBooksCategory(resparam);
        BooksStoreCategoryFunction(resparam);
    }, [resparam]);

    let countryPage = books.length / 12;

    return (
        <Stack>
            <Container sx={{ py: "20px", width: "100%" }}>
                {isTrueSearch ? (
                    filterBookResult.length ? (
                        <>
                            <Typography sx={{ fontSize: "24px", mb: "20px" }}>
                                {t("search")}
                            </Typography>
                            <Grid container spacing={4} sx={{ width: "100%" }}>
                                {filterBookResult.map((elem, i) => {
                                    return (
                                        <Grid key={i + 1} item sm={3}>
                                            <Item
                                                elem={elem}
                                                category={props.category}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </>
                    ) : (
                        <Stack>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "44px",
                                    color: "lightgray",
                                }}
                            >
                                {t("notfound")}
                            </Typography>
                            <NoResultSearch />
                        </Stack>
                    )
                ) : (
                    <>
                        <Typography sx={{ fontSize: "24px", py: "20px" }}>
                            {t(`${props.title}`)}
                        </Typography>
                        <Grid container spacing={4} sx={{ width: "100%" }}>
                            {props.title == "books" ? (
                                <>
                                    {props.product &&
                                        props.product?.map((elem, i) => {
                                            return (
                                                <Grid key={i + 1} item sm={3}>
                                                    <Item
                                                        elem={elem}
                                                        category={
                                                            props.category
                                                        }
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    <Stack
                                        py={4}
                                        direction={"row"}
                                        justifyContent={"center"}
                                        width={"100%"}
                                    >
                                        <Pagination
                                            count={Math.round(countryPage)}
                                            page={1}
                                            onClick={(e) =>
                                                console.log(e.target)
                                            }
                                            color="primary"
                                            size="large"
                                        />
                                    </Stack>
                                </>
                            ) : (
                                props.product &&
                                props.product?.map((elem, i) => {
                                    return (
                                        <Grid key={i + 1} item sm={3}>
                                            <Item
                                                elem={elem}
                                                category={props.category}
                                            />
                                        </Grid>
                                    );
                                })
                            )}
                        </Grid>
                    </>
                )}
            </Container>
        </Stack>
    );
};

export default Products;
