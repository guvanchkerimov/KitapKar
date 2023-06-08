import { useEffect } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBooksStore } from "../../modules/booksApi/store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Item from "../Item/Item";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BooksCarusel = () => {
    const booksOnRent = useBooksStore((state) => state.booksOnRent);
    const fetchBooksOnRent = useBooksStore((state) => state.fetchBooksOnRent);
    const { t } = useTranslation();

    useEffect(() => {
        fetchBooksOnRent(false);
    }, []);
    return (
        <>
            <Stack
                sx={{ my: "10px" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Typography sx={{ fontSize: "24px", py: "20px" }}>
                    {t("available")}
                </Typography>
                <Link to={"books-on-rent"}>
                    <IconButton>
                        <ChevronRightIcon
                            sx={{ fontSize: "34px", color: "black" }}
                        />
                    </IconButton>
                </Link>
            </Stack>
            <Swiper slidesPerView={4} spaceBetween={40}>
                {booksOnRent.map((elem, index) => (
                    <SwiperSlide key={index + 1}>
                        <Item elem={elem} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default BooksCarusel;
