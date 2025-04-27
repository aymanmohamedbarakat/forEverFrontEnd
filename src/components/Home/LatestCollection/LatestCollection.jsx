import React, { useEffect, useState } from "react";
import { ShopRepo } from "../../../data/Repo/ShopRepo";
import Title from "../../Title/Title";
import ProductItem from "../../ProductItem/ProductItem";
import { domain } from "../../../store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function LatestCollection() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    ShopRepo.index_productItems()
      .then((res) => {
        const latest = (res?.data || []).slice(0, 5);
        setLatestProducts(latest);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-2xl md:text-3xl">
        <Title text1="Latest" text2="Collection" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
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
        {Array.isArray(latestProducts) && latestProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 sm:px-10">
            {latestProducts.map((el, index) => (
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
            ))}
          </div>
        ) : null}
      </Swiper>
    </div>
  );
}
