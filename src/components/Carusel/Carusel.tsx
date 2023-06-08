import { Swiper, SwiperSlide, useSwiper} from "swiper/react";
import "./Carusel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Autoplay } from "swiper";

const Carusel = () => {
    return (
        <div style={{ position: "relative" }}>
            <Swiper
                modules={[Pagination, Autoplay]}
                style={{ cursor: "pointer" }}
          
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
            >
                <SwiperButonPrev />
                <SwiperButonNext />
                <SwiperSlide>
                    <img
                        alt="image1"
                        style={{ width: "100%" }}
                        src="image/carusel/1.jpg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        alt="image2"
                        style={{ width: "100%" }}
                        src="image/carusel/2.jpg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        alt="image3"
                        style={{ width: "100%" }}
                        src="image/carusel/3.jpg"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
const SwiperButonPrev = () => {
    const swiper = useSwiper();
    return (
        <IconButton
            className="btn buttonNavigationLeft"
            onClick={() => swiper.slidePrev()}
        >
            <ArrowBackIos />
        </IconButton>
    );
};
const SwiperButonNext = () => {
    const swiper = useSwiper();
    return (
        <IconButton
            className="btn buttonNavigationRight"
            onClick={() => swiper.slideNext()}
        >
            <ArrowForwardIos />
        </IconButton>
    );
};
export default Carusel;
