import { Stack, Container, Typography, Button } from "@mui/material";
import { useBooksStoreLibrary } from "../modules/bookstore/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BookStore = () => {
    const BooksStoreLibraryFunction = useBooksStoreLibrary(
        (state) => state.BooksStoreLibraryFunction
    );
    const libraryApi = useBooksStoreLibrary((state) => state.libraryApi);
    useEffect(() => {
        BooksStoreLibraryFunction();
    }, []);
    const { t } = useTranslation();

    return (
        <Container sx={{ pt: "20px" }}>
            <Typography sx={{fontSize:'24px'}}>{t("libraries")}</Typography>
            <Stack
                pt={"30px"}
                direction={"row"}
                justifyContent={"space-between"}
            >
                {libraryApi.map((elem, index) => (
                    <Stack key={index + 1}>
                        <Stack sx={{ height: "350px", width: "350px" }}>
                            <img
                                style={{ height: "100%", width: "100%" }}
                                src={`../../public/image/${elem.image}`}
                                alt="image"
                            />
                        </Stack>
                        <Button>
                            <Typography sx={{fontSize:'18px'}}>{elem.name}</Typography>
                        </Button>
                    </Stack>
                ))}
            </Stack>
        </Container>
    );
};
export default BookStore;
