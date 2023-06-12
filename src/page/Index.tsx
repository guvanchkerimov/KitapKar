import Carusel from "../components/Carusel/Carusel";
import { Container } from "@mui/material";
import BooksCarusel from "../components/BooksCarusel/BooksCarusel";

const Index = () => {
    return (
        <>
            <Carusel />
            <Container>
                <BooksCarusel />
            </Container>
        </>
    );
};
export default Index;
