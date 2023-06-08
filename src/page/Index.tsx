import Carusel from "../components/Carusel/Carusel";
import HeaderTwo from "../components/HeaderTwo/HeaderTwo";
import { Container } from "@mui/material";
import BooksCarusel from "../components/BooksCarusel/BooksCarusel";

const Index = () => {
    return (
        <>
            <HeaderTwo />
            <Carusel />
            <Container>
                <BooksCarusel />
            </Container>
        </>
    );
};
export default Index;
