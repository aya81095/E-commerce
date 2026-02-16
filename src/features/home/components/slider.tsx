"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import sliderImage from "../../../assets/images/home-slider-1.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        className="hero-slider"
      >
        <SwiperSlide>
          <div className="relative h-full flex justify-center items-center" style={{ backgroundImage: `url(${sliderImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="container py-20 mx-auto md:px-15 px-8 relative z-10 bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  Fresh Produce Delivered<br />to Your Door
                </h1>
                <p className="text-white/95 text-sm md:text-base mb-6">
                  get 20% off on your first order
                </p>
                <div className="flex gap-4">
                <button className="bg-white text-green-600 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-50 transition-colors text-sm">
                  Shop Now 
                </button>
                <button className="bg-transparent border border-white text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors text-sm">
                  View Details
                </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full flex justify-center items-center" style={{ backgroundImage: `url(${sliderImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="container py-20 mx-auto md:px-15 px-8 relative z-10 bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  Premium Quality<br />Guaranteed
                </h1>
                <p className="text-white/95 text-sm md:text-base mb-6">
                  Fresh from farm to your table
                </p>
                <div className="flex gap-4">
                <button className="bg-white text-green-600 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-50 transition-colors text-sm">
                  Shop Now 
                </button>
                <button className="bg-transparent border border-white text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors text-sm">
                  Learn More
                </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full flex justify-center items-center" style={{ backgroundImage: `url(${sliderImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="container py-20 mx-auto md:px-15 px-8 relative z-10 bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  Fast & free <br /> delivery
                </h1>
                <p className="text-white/95 text-sm md:text-base mb-6">
                 Delivered to your door in no time
                </p>
                <div className="flex gap-4">
                <button className="bg-white text-green-600 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-50 transition-colors text-sm">
                  Order Now
                </button>
                <button className="bg-transparent border border-white text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors text-sm">
                  Delivery Info
                </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

      <button className="custom-prev absolute top-1/2 left-4 z-10 size-10 text-green-600 bg-white/80 p-2 rounded-full top-1/2 left-4 -translate-y-1/2 cursor-pointer">
        <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
      </button>

      <button className="custom-next absolute top-1/2 right-4 z-10 size-10 text-green-600 bg-white/80 p-2 rounded-full top-1/2 right-4 -translate-y-1/2 cursor-pointer">
        <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
      </button>

      <style jsx global>{`
        .hero-slider .swiper-pagination {
          bottom: 20px;
        }
        .hero-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .hero-slider .swiper-pagination-bullet-active {
          background: white;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
