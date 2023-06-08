import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";
import { useBooksStore } from "../modules/booksApi/store";
import { useUserStore } from "../modules/usersApi/store";
import { useCategoryStore } from "../modules/categoryApi/store";
import { useTranslation } from "react-i18next";
import "../index.css";
const Book = () => {
    const fetchUsers = useUserStore((state) => state.fetchUsers);
    const users = useUserStore((state) => state.user);
    const activeBook = useBooksStore((state) => state.activeBook);
    const fetchActiveBookFn = useBooksStore((state) => state.fetchActiveBookFn);
    const categoryApi = useCategoryStore((state) => state.categoryApi);
    const param = useParams();
    let resparam = Object.values(param)[0];

    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        fetchActiveBookFn(resparam);
    }, [resparam]);
    const { t } = useTranslation();

    return (
        // <Stack className="backBook" sx={{ height: "100%" }}>
        //     <Stack className="backOpacity">
        <Container sx={{ my: "30px" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack
                    sx={{
                        height: "500px",
                        width: "36%",
                        border: "4px solid #e3f2fd",
                    }}
                >
                    <img
                        style={{ height: "100%", width: "100%" }}
                        src={`/public/${activeBook.img_url}`}
                        alt="img"
                    />
                </Stack>
                <Stack sx={{ width: "50%" }} spacing={2}>
                    <Typography sx={{ fontSize: "30px" }}>
                        {activeBook.title}
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>
                            {`${t("Author")}: `}
                        </Typography>
                        <Typography>{activeBook.author}</Typography>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>{`${t(
                            "Page"
                        )}: `}</Typography>
                        <Typography>{activeBook.pages}</Typography>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>
                            {t("rent_price")}:
                        </Typography>
                        <Typography>{activeBook.rent_price} TMT</Typography>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>
                            {t("Price")}:
                        </Typography>
                        <Typography>{activeBook.price} TMT</Typography>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>{`${t(
                            "Language"
                        )}:`}</Typography>
                        <Typography> {activeBook.language}</Typography>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography sx={{ fontWeight: "600" }}>
                            {t('categoryName')}:
                        </Typography>
                        {categoryApi.map((elem, index) =>
                            elem.id === activeBook.category ? (
                                <Typography key={index + 1}>
                                    {elem.name}
                                </Typography>
                            ) : (
                                <></>
                            )
                        )}
                    </Stack>
                    <Typography>{activeBook.description}</Typography>
                    <Stack>
                        {users.map((elem, index) =>
                            elem.id === activeBook.owner_id ? (
                                <Stack key={index + 1}>
                                    <Stack spacing={1} direction={"row"}>
                                        <Typography sx={{ fontWeight: "600" }}>
                                            {t("owner")}
                                        </Typography>
                                        <Typography>{elem.username}</Typography>
                                    </Stack>
                                    <Stack spacing={1} direction={"row"}>
                                        <Typography sx={{ fontWeight: "600" }}>
                                            {t("phone")}
                                        </Typography>
                                        <Typography>
                                            +993 {elem.number}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ) : (
                                ""
                            )
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
        //     </Stack>
        // </Stack>
    );
};

export default Book;
