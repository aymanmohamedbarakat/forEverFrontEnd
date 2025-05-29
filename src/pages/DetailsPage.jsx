// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ShopRepo } from "../data/Repo/ShopRepo";
// import { currency, domain, useCartStore } from "../store";
// import { assets } from "../assets/frontend_assets/assets";
// import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
// import RelatedProduct from "../components/RelatedProduct/RelatedProduct";
// import ProductWishlistButton from "../components/ProductWishlistButton/ProductWishlistButton";

// export default function DetailsPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [productData, setProductData] = useState(null);
//   const [imageProduct, setImageProduct] = useState(null);
//   const [size, setSize] = useState("");

//   //Hooks
//   const { addToCart } = useCartStore();

//   useEffect(() => {
//     if (productId) {
//       ShopRepo.index_productDetails(productId).then((data) => {
//         setProductData(data);
//         if (data.image && data.image.length > 0) {
//           setImageProduct(data.image[0]);
//         }
//       });
//     }
//   }, [productId]);

//   const handleAddToCart = () => {
//     if (productData && productData.documentId) {
//       addToCart(productData.documentId, size , productData.price);
//     }
//   };

//   const goBack = () => {
//     navigate(-1);
//   };

//   // Only attempt to access sizeproduct if productData exists
//   const availableSizes = productData && productData.size
//     ? productData.size.split(",")
//     : [];

//   return (
//     <>
//       {/* Back Button */}
//       <div className="py-4 px-4">
//         <button
//           onClick={goBack}
//           className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
//         >
//           <FaArrowLeft className="mr-2" />
//           <span>Back</span>
//         </button>
//       </div>

//       {productData ? (
//         <div className="border-t border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100">
//           {/* ----------------- Product Data ----------------- */}
//           <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
//             {/* ----------------- Product Image ----------------- */}
{
  /* <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
  <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
    {productData.image.map((el, index) => (
      <img
        key={index}
        src={domain + el.url}
        className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer ${
          el.documentId === imageProduct?.documentId
            ? "border border-gray-500"
            : ""
        }`}
        alt=""
        onClick={() => setImageProduct(el)}
      />
    ))}
  </div>
  <div className="w-full sm:w-4/5">
    <img src={domain + imageProduct?.url} className="w-full h-auto" alt="" />
  </div>
</div>; */
}
//             {/* ----------------- Product Details ----------------- */}
//             <div className="flex-1">
//               <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
//               <div className="flex items-center gap-1 mt-2">
//                 <img src={assets.star_icon} alt="" className="w-3 5" />
//                 <img src={assets.star_icon} alt="" className="w-3 5" />
//                 <img src={assets.star_icon} alt="" className="w-3 5" />
//                 <img src={assets.star_icon} alt="" className="w-3 5" />
//                 <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//                 <p className="pl-2">{122}</p>
//               </div>
//               <p className="mt-5 text-3xl font-medium">
//                 {currency}
//                 {productData.price}
//               </p>
//               <p className="mt-5 text-gray-500 md:w-4/5">
//                 {productData.description}
//               </p>
//               <div className="flex flex-col gap-4 my-8">
//                 <p>Select Size</p>
//                 <div className="flex gap-2">
//                   {availableSizes.map((sizeValue) => (
//                     <button
//                       key={sizeValue}
//                       onClick={() => setSize(sizeValue)}
//                       className={`border px-4 py-2 bg-gray-100 ${
//                         sizeValue === size ? "border-gray-500" : ""
//                       }`}
//                     >
//                       {sizeValue}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex gap-4 mt-5 mb-5">
//                 <p className="text-sm text-gray-500">Delivery in 3-5 days</p>
//                 <p className="text-sm text-gray-500">Free Delivery</p>
//               </div>
// <div className="flex flex-wrap gap-4">
//   <button onClick={handleAddToCart} className="btn btn-soft">
//     <FaShoppingCart className="mr-2" />
//     ADD TO CART
//   </button>
//   <ProductWishlistButton productId={productData.documentId} />
// </div>
//               <hr className="mt-8 sm:w-4/5 border border-gray-300" />
//               <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//                 <p>100% Original Product.</p>
//                 <p>Cash on delivery is available on this product.</p>
//                 <p>Easy return and exchange policy within 7 days.</p>
//               </div>
//             </div>
//           </div>
//           {/* ----------------- Description & Review Section ----------------- */}
//           <div className="mt-20">
//             <div className="flex">
//               <b className="border border-gray-300 px-5 py-3 text-sm">
//                 Description
//               </b>
//               <p className="border border-gray-300 px-5 py-3 text-sm">
//                 Review (122)
//               </p>
//             </div>
//             <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500 ">
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
//                 ducimus fugit ex perspiciatis vitae inventore unde earum impedit
//                 architecto. Maiores nulla tempora, a perferendis dolor nesciunt
//                 animi labore odit ad.
//               </p>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
//                 ratione quas placeat harum fugiat quis, inventore aperiam
//                 blanditiis quae debitis quasi natus, laboriosam dolorem dolores
//                 optio veritatis, obcaecati libero suscipit.
//               </p>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
//                 ratione quas placeat harum fugiat quis, inventore aperiam
//                 blanditiis quae debitis quasi natus, laboriosam dolorem dolores
//                 optio veritatis, obcaecati libero suscipit.
//               </p>
//             </div>
//           </div>

//           {/* ----------------- display related products ----------------- */}
//           <RelatedProduct
//             category={productData.category?.documentId}
//             sub_category={productData.sub_category?.documentId}
//           />
//         </div>
//       ) : (
//         <div className="opacity-0"></div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopRepo } from "../data/Repo/ShopRepo";
import { currency, domain, useCartStore } from "../store";
import { assets } from "../assets/frontend_assets/assets";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaHeart,
  FaTruck,
  FaExchangeAlt,
  FaShieldAlt,
} from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct/RelatedProduct";
import ProductWishlistButton from "../components/ProductWishlistButton/ProductWishlistButton";

export default function DetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  // Hooks
  const { addToCart, cartItems } = useCartStore();

  const productInCartCount = cartItems.reduce((count, item) => {
    if (item.documentId === productId) {
      return count + item.quantity;
    }
    return count;
  }, 0);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      ShopRepo.index_productDetails(productId).then((data) => {
        setProductData(data);
        if (data.image && data.image.length > 0) {
          setImageProduct(data.image[0]);
        }
        setLoading(false);
      });
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (productData && productData.documentId) {
      addToCart(productData.documentId, size, productData.price);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // Only attempt to access sizeproduct if productData exists
  const availableSizes =
    productData && productData.size ? productData.size.split(",") : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl border-t  border-gray-200">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-500 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Shop</span>
        </button>
      </div>

      {productData && (
        <div className="transition-opacity ease-in duration-500 opacity-100">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images Section */}
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productData.image.map((el, index) => (
                  <img
                    key={index}
                    src={domain + el.url}
                    className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer ${
                      el.documentId === imageProduct?.documentId
                        ? "border border-gray-500"
                        : ""
                    }`}
                    alt=""
                    onClick={() => setImageProduct(el)}
                  />
                ))}
              </div>
              <div className="w-full sm:w-4/5">
                <img
                  src={domain + imageProduct?.url}
                  className="w-full h-auto"
                  alt=""
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              {/* Title & Rating */}
              <h1 className="font-bold text-3xl text-gray-800">
                {productData.name}
              </h1>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4].map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_icon}
                      alt=""
                      className="w-4 h-4"
                    />
                  ))}
                  <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-500 ml-2">(122 Reviews)</p>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-600">
                  {currency}
                  {productData.price}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-600">{productData.description}</p>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <p className="font-medium text-gray-800 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((sizeValue) => (
                    <button
                      key={sizeValue}
                      onClick={() => setSize(sizeValue)}
                      className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                        sizeValue === size
                          ? "border-gray-500 bg-gray-50 text-gray-600 font-medium"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {sizeValue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex gap-6 mt-8">
                <div className="flex items-center">
                  <FaTruck className="text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Delivery in 3-5 days</p>
                </div>
                <div className="flex items-center">
                  <FaExchangeAlt className="text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Free Delivery</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-soft relative"
                >
                  <FaShoppingCart className="mr-2" />
                  ADD TO CART
                  {productInCartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                      {productInCartCount}
                    </div>
                  )}
                </button>
                <div className="flex-1">
                  <ProductWishlistButton
                    productId={productData.documentId}
                    className="w-full btn btn-soft border border-gray-300 hover:border-gray-400   transition-all"
                  />
                </div>
              </div>

              {/* Product Guarantees */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <div className="mr-3 text-gray-500">
                      <FaShieldAlt size={18} />
                    </div>
                    <p className="text-sm text-gray-600">
                      100% Original Product
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 text-gray-500">
                      <FaTruck size={18} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Cash on delivery available
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 text-gray-500">
                      <FaExchangeAlt size={18} />
                    </div>
                    <p className="text-sm text-gray-600">Easy 7-day returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Review Tabs */}
          <div className="mb-16">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "description"
                    ? "text-gray-500 border-b-2 border-gray-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "text-gray-500 border-b-2 border-gray-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (122)
              </button>
            </div>

            <div className="py-6">
              {activeTab === "description" ? (
                <div className="text-gray-600 space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut ducimus fugit ex perspiciatis vitae inventore unde earum
                    impedit architecto. Maiores nulla tempora, a perferendis
                    dolor nesciunt animi labore odit ad.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus ratione quas placeat harum fugiat quis, inventore
                    aperiam blanditiis quae debitis quasi natus, laboriosam
                    dolorem dolores optio veritatis, obcaecati libero suscipit.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus ratione quas placeat harum fugiat quis, inventore
                    aperiam blanditiis quae debitis quasi natus, laboriosam
                    dolorem dolores optio veritatis, obcaecati libero suscipit.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Review content would appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <RelatedProduct
            category={productData.category?.documentId}
            sub_category={productData.sub_category?.documentId}
          />
        </div>
      )}
    </div>
  );
}
