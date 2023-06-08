import { useEffect, useState } from "react";
import {
    TextField,
    Container,
    Stack,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import { useBooksStore } from "../modules/booksApi/store";
import Item from "../components/Item/Item";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const useMyBooksFetch = useBooksStore((state) => state.fetchMyBooks);
    const myBooks = useBooksStore((state) => state.myBooks);
    const [fileImage, setFileImage] = useState();
    const [newBookInfo, setNewBookInfo] = useState({
        title: "",
        autor: "",
        description: "",
        price: "",
    });
    const { t } = useTranslation();

    useEffect(() => {
        useMyBooksFetch();
    }, []);
    function changeImage(e: any) {
        setFileImage(e.target.files[0]);
    }
    // function handleAddBook() {
    //     if (newBookInfo.title.trim()) {
    //         if (newBookInfo.autor.trim()) {
    //             if (fileImage) {
    //                 const formData = new FormData();
    //                 formData.append("myImage", fileImage);
    //                 const result = axios.post("http://localhost:3004/books", books);

    //             } else return alert("Bahasy?");
    //         } else return alert("Autor");
    //     } else return alert("Title");
    //     console.log(books);
    // }
    return (
        <Container>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack sx={{ width: "70%", pt: "20px" }}>
                    <Typography sx={{ textAlign: "center", fontSize: "26px", mb:'10px' }}>
                        {t('mybooks')}
                    </Typography>
                    {myBooks.length ? (
                        myBooks.map((elem, i) => (
                            <Grid width={"120px"} key={i + 1} item sm={3}>
                                <Item elem={elem} />
                            </Grid>
                        ))
                    ) : (
                        <Stack>
                            <Typography>Sizin Kitaplarynyz yok</Typography>
                        </Stack>
                    )}
                </Stack>
                <Stack
                    spacing={2}
                    sx={{
                        p: "10px",
                        width: "30%",
                        height: "87.6vh",
                        bgcolor: "primary.dark",
                    }}
                >
                    <TextField
                        value={newBookInfo.title}
                        onChange={(e) =>
                            setNewBookInfo({
                                ...newBookInfo,
                                title: e.target.value,
                            })
                        }
                        size="small"
                        label="Kitabyn ady"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        value={newBookInfo.price}
                        onChange={(e) =>
                            setNewBookInfo({
                                ...newBookInfo,
                                price: e.target.value,
                            })
                        }
                        size="small"
                        label="0"
                        variant="outlined"
                        sx={{ bgcolor: "white", width: "100px" }}
                    />
                    <TextField
                        value={newBookInfo.autor}
                        onChange={(e) =>
                            setNewBookInfo({
                                ...newBookInfo,
                                autor: e.target.value,
                            })
                        }
                        type="text"
                        size="small"
                        label="Awtor"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        type="text"
                        size="small"
                        label="Dili"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        type="text"
                        size="small"
                        label="Kitap bahasy"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        type="text"
                        size="small"
                        label="Kategoriya"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        value={newBookInfo.description}
                        onChange={(e) =>
                            setNewBookInfo({
                                ...newBookInfo,
                                description: e.target.value,
                            })
                        }
                        type="text"
                        size="small"
                        label="Ginisleyin"
                        variant="outlined"
                        sx={{ bgcolor: "white", color: "black" }}
                    />
                    <TextField
                        type="text"
                        size="small"
                        label="Eýesi"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <TextField
                        type="text"
                        size="small"
                        label="Nomer"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <form>
                        <input
                            value={fileImage}
                            onChange={changeImage}
                            type="file"
                            name="myImg"
                            accessKey="image/png, image/gif, image/jpeg"
                        />
                        <Button
                            // onClick={() => handleAddBook()}
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "white",
                                ":hover": {
                                    bgcolor: "primary.main",
                                },
                            }}
                        >
                            Gosmak
                        </Button>
                    </form>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Profile;
