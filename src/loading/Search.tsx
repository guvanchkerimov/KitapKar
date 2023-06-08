import { Player } from "@lottiefiles/react-lottie-player";

const SearchLoading = () => {
    return (
        <Player
            autoplay
            loop
            src="../raw/searchLoadig.json"
            style={{ height: "300px", width: "300px" }}
        ></Player>
    );
};

export default SearchLoading;
