import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Stack, Typography, Card, CardActionArea } from "@mui/material";
import { BookType } from "../../modules/booksApi/store";
import "./Item.css";
import { Link } from "react-router-dom";
import { useBooksStore } from "../../modules/booksApi/store";

export type IProps = {
    elem: BookType;
    category?: boolean;
};

const Item = (props: IProps) => {
    const fetchActiveBookFn = useBooksStore((state) => state.fetchActiveBookFn);
    const activeBookIdFn = useBooksStore((state) => state.activeBookIdFn);

    function changeNavigate(elem: BookType) {
        activeBookIdFn(elem.id);
        fetchActiveBookFn(elem.id);
    }

    useEffect(() => {});
    return (
        <Link to={`/books/${props.elem.id}`} style={{ textDecoration: "none" }}>
            <Card
                sx={{
                    width: "270px",
                    height: "350px",
                    position: "relative",
                }}
                onClick={() => changeNavigate(props.elem)}
            >
                <CardActionArea sx={{ height: "100%" }}>
                    <Stack sx={{ height: "75%", overflow: "hidden" }}>
                        <img
                            className="ImageItem"
                            style={{ height: "100%" }}
                            src={
                                props.category
                                    ? `/public/${props.elem.img_url}`
                                    : props.elem.img_url
                            }
                            alt="img"
                        />
                    </Stack>
                    <Stack sx={{ px: "25px", height: "20%" }}>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{ color: "#3d49f2" }}
                        >
                            <Stack
                                spacing={0.5}
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "16px",
                                    }}
                                >
                                    {props.elem.rent_price}
                                </Typography>
                                <Typography>TMT</Typography>
                            </Stack>
                            <Typography
                                sx={{
                                    color: "gray",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                }}
                            >
                                {props.elem.price}TMT
                            </Typography>
                        </Stack>
                        <Typography
                            sx={{
                                fontSize: "13px",
                            }}
                        >
                            {props.elem.title}
                        </Typography>
                    </Stack>
                </CardActionArea>
                <Stack
                    sx={{
                        height: "10px",
                        width: "100%",
                        bgcolor: props.elem.on_rent ? "#ff2121" : "#5eff99",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: "10",
                    }}
                ></Stack>
            </Card>
        </Link>
    );
};
export default Item;
