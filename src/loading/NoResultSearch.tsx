import { Player } from "@lottiefiles/react-lottie-player";

const NoResultSearch = () => {
    return (
        <Player
            autoplay
            loop
            src="../../src/raw/noResultSearch.json"
            style={{ height: "300px", width: "300px" }}
        ></Player>
    );
};

export default NoResultSearch;
