import React, { useEffect, useState } from "react";
import { ShopRepo } from "../../../data/Repo/ShopRepo";
import Title from "../../Title/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { domain } from "../../../store";
import ProductItem from "../../ProductItem/ProductItem";

export default function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    ShopRepo.index_productItems()
      .then((res) => {
        const bestSeller = (res?.data || []).filter(
          (product) => product.bestSeller === true
        );
        setBestSeller(bestSeller.slice(0, 7));
      })
      .catch((err) => console.error("Error fetching bestsellers:", err));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-2xl md:text-3xl">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod .
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {Array.isArray(bestSeller) && bestSeller.length > 0
          ? bestSeller.map((el, index) => (
              <SwiperSlide key={index}>
                <ProductItem
                  key={el.documentId}
                  id={el.documentId}
                  name={el.name}
                  imgUrl={
                    el.image?.[0]?.url ? domain + el.image[0].url : undefined
                  }
                  price={el.price}
                  bestSeller={el.bestSeller}
                  category={el.category}
                  sub_category={el.sub_category}
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}
