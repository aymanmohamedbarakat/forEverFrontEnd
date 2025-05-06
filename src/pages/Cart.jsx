// import React, { useEffect } from "react";
// import Title from "../components/Title/Title";

// import { ArrowRight, Minus, Plus, RefreshCcw, ShoppingBag, Trash2, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { ShopRepo } from "../data/Repo/ShopRepo";
// import { useState } from "react";
// import { currency, domain, useCartStore } from "../store";
// import CartTotal from "../components/CartTotal/CartTotal";

// export default function Cart() {
//   const { cartItems, clearCart, removeFromCart, updateQuantity } =
//     useCartStore();
//   const [showCart, setShowCart] = useState([]);
//   const isCartEmpty = cartItems.length === 0;
//   const navigate = useNavigate();

//   useEffect(() => {
//     ShopRepo.index_productItems().then((res) => {
//       setShowCart(res.data);
//     });
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="border-t border-gray-300 pt-8">
//         <div className="flex justify-between items-center mb-6">
//           <Title text1={"YOUR"} text2={"CART"} />
//           {!isCartEmpty && (
//             <button
//               onClick={clearCart}
//               className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-sm"
//             >
//               <RefreshCcw size={16} className="mr-1" />
//               Clear Cart
//             </button>
//           )}
//         </div>

//         {isCartEmpty ? (
//           <div className="py-16 text-center">
//             <div className="flex justify-center mb-4">
//               <ShoppingBag size={64} className="text-gray-300" />
//             </div>
//             <p className="text-xl text-gray-600 mb-6">
//               Your shopping cart is empty
//             </p>
//             <button
//               onClick={() => navigate("/shopping")}
//               className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors flex items-center mx-auto"
//             >
//               CONTINUE SHOPPING
//               <ArrowRight size={16} className="ml-2" />
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Cart items header - desktop only */}
//             <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 pb-2 border-b border-gray-200 font-medium text-gray-500">
//               <div>Product</div>
//               <div className="text-center">Size</div>
//               <div className="text-center">Quantity</div>
//               <div className="text-right">Total</div>
//             </div>

//             {cartItems.map((item, index) => {
//               const productData = showCart?.find(
//                 (p) => p.documentId === item.documentId
//               );
//               if (!productData) return null;

//               // Safely access the image URL
//               const imageUrl = productData.image && productData.image.length > 0
//                 ? (productData.image[0].url ? domain + productData.image[0].url : productData.image[0])
//                 : '';

//               return (
//                 <div
//                   key={`${item.documentId}-${item.size}-${index}`}
//                   className="py-6 md:grid md:grid-cols-[3fr_1fr_1fr_1fr] gap-4 items-center border-b border-gray-200"
//                 >
//                   {/* Product info */}
//                   <div className="flex items-center gap-4 mb-4 md:mb-0">
//                     <div className="relative">
//                       <img
//                         className="w-20 h-20 object-cover"
//                         src={imageUrl}
//                         alt={productData.name}
//                       />
//                       <button
//                         onClick={() =>
//                           removeFromCart(item.documentId, item.size)
//                         }
//                         className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:hidden"
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>

//                     <div>
//                       <p className="font-medium">{productData.name}</p>
//                       <p className="text-gray-600 mt-1">
//                         {currency}
//                         {productData.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Size */}
//                   <div className="flex items-center md:justify-center mb-4 md:mb-0">
//                     <div className="md:hidden text-gray-500 mr-3">Size:</div>
//                     <div className="px-3 py-1 border bg-slate-50 inline-block rounded">
//                       {item.size}
//                     </div>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center md:justify-center mb-4 md:mb-0">
//                     <div className="md:hidden text-gray-500 mr-3">
//                       Quantity:
//                     </div>
//                     <div className="flex items-center border border-gray-300 rounded">
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.documentId,
//                             item.size,
//                             item.quantity - 1
//                           )
//                         }
//                         disabled={item.quantity <= 1}
//                         className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="px-3 py-1 border-x border-gray-300">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.documentId,
//                             item.size,
//                             item.quantity + 1
//                           )
//                         }
//                         className="px-2 py-1 hover:bg-gray-100"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Total */}
//                   <div className="flex justify-between items-center md:justify-end">
//                     <div className="md:hidden text-gray-500">Total:</div>
//                     <div className="font-medium">
//                       {currency}
//                       {(productData.price * item.quantity).toFixed(2)}
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.documentId, item.size)}
//                       className="text-red-500 hidden md:flex md:items-center hover:text-red-600 ml-4"
//                     >
//                       <Trash2 size={16} className="mr-1" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//             {/* Cart totals and checkout */}
//             <div className="mt-10 md:flex md:justify-end">
//             <div className="w-full md:w-96">
//                 <CartTotal />
//                 <div className="w-full">
//                   <button
//                     onClick={() => navigate("/place-order")}
//                     className="w-full bg-black text-white text-sm mt-6 px-8 py-3 cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center"
//                   >
//                     PROCEED TO CHECKOUT
//                     <ArrowRight size={16} className="ml-2" />
//                   </button>
//                 </div>
//             </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShopRepo } from "../data/Repo/ShopRepo";
import { currency, domain, useCartStore } from "../store";
import CartTotal from "../components/CartTotal/CartTotal";
import Title from "../components/Title/Title";

export default function Cart() {
  const { cartItems, clearCart, removeFromCart, updateQuantity } =
    useCartStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isCartEmpty = cartItems.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    ShopRepo.index_productItems()
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const getProductData = (documentId) => {
    return products.find((p) => p.documentId === documentId);
  };

  const getImageUrl = (product) => {
    if (!product || !product.image || product.image.length === 0) {
      return "";
    }
    return product.image[0].url
      ? domain + product.image[0].url
      : product.image[0];
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <button
        onClick={() => navigate("/shopping")}
        className="text-gray-600 hover:text-black inline-flex items-center transition-colors mb-3"
      >
        <ChevronLeft size={16} className="mr-1" />
        Continue Shopping
      </button>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl">
            <Title text1={"SHOPPING"} text2={"CART"} />
          </div>

          {!isCartEmpty && (
            <button
              onClick={clearCart}
              className="ml-6 flex items-center text-gray-500 hover:text-red-500 transition-colors"
            >
              <RefreshCcw size={14} className="mr-1" />
              Clear Cart
            </button>
          )}
        </div>
      </div>
      {isCartEmpty ? (
        <div className="py-16 text-center bg-gray-50 rounded-lg">
          <div className="flex justify-center mb-6">
            <ShoppingBag size={72} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={() => navigate("/shopping")}
            className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors flex items-center mx-auto"
          >
            Browse Products
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Cart items header */}
              <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
                <div>Product</div>
                <div className="text-center">Size</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>

              {/* Cart items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => {
                  const product = getProductData(item.documentId);
                  if (!product) return null;

                  const imageUrl = getImageUrl(product);
                  const itemTotal = product.price * item.quantity;

                  return (
                    <div
                      key={`${item.documentId}-${item.size}-${index}`}
                      className="p-4 md:grid md:grid-cols-[3fr_1fr_1fr_1fr] gap-4 items-center"
                    >
                      {/* Product info */}
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="relative bg-gray-50 rounded p-1">
                          <img
                            className="w-24 h-24 object-cover rounded"
                            src={imageUrl}
                            alt={product.name}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-gray-500 mt-1">
                            {currency}
                            {product.price.toFixed(2)}
                          </p>
                          <button
                            onClick={() =>
                              removeFromCart(item.documentId, item.size)
                            }
                            className="mt-2 text-sm text-red-500 flex md:hidden items-center hover:text-red-600"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Size */}
                      <div className="flex items-center md:justify-center mb-4 md:mb-0">
                        <div className="md:hidden text-gray-500 mr-3 text-sm">
                          Size:
                        </div>
                        <div className="px-3 py-1 border bg-gray-50 inline-block rounded text-center min-w-[50px]">
                          {item.size}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center md:justify-center mb-4 md:mb-0">
                        <div className="md:hidden text-gray-500 mr-3 text-sm">
                          Quantity:
                        </div>
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.documentId,
                                item.size,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-200 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.documentId,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center md:justify-end">
                        <div className="md:hidden text-gray-500 text-sm">
                          Total:
                        </div>
                        <div className="font-medium">
                          {currency}
                          {itemTotal.toFixed(2)}
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.documentId, item.size)
                          }
                          className="text-gray-400 hidden md:flex md:items-center hover:text-red-500 ml-4 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <CartTotal />
              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-black text-white mt-6 px-6 py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </button>

              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center justify-center">
                  <ShoppingBag size={14} className="mr-1" />
                  <span>
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                    items in your cart
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
