import HeaderTwo from "../components/HeaderTwo/HeaderTwo";
import Products from "../components/Products/Products";
import { BookType } from "../modules/booksApi/store";

type IProps = {
    category?: boolean;
    product: BookType[];
    title: string;
};
const Books = (props: IProps) => {
    return (
        <>
            <HeaderTwo disabled={true} />
            <Products
                category={props.category}
                product={props.product}
                title={props.title}
            />
        </>
    );
};

export default Books;
