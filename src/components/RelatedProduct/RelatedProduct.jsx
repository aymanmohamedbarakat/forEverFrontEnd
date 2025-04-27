import React, { useEffect, useState } from "react";
import { ShopRepo } from "../../data/Repo/ShopRepo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductItem from "../ProductItem/ProductItem";
import Title from "../Title/Title"; // Added import for Title component
import { domain } from "../../store"; // Added import for domain

export default function RelatedProduct({ category, sub_category }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    ShopRepo.index_productItems(1, 10, {
      categories: category ? [category] : [],
      subCategories: sub_category ? [sub_category] : [],
    })
      .then((res) => {
        const relatedProducts = (res?.data || []).filter(
          (product) =>
            (category && product.category?.documentId === category) ||
            (sub_category && product.sub_category?.documentId === sub_category)
        );
        setRelated(relatedProducts.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching related products:", err));
  }, [category, sub_category]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
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
        {related.map((el, index) => (
          <SwiperSlide key={index}>
            <ProductItem
              key={el.documentId}
              id={el.documentId}
              name={el.name}
              imgUrl={el.image?.[0]?.url ? domain + el.image[0].url : undefined}
              price={el.price}
              bestSeller={el.bestSeller}
              category={el.category}
              sub_category={el.sub_category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
