// import React, { useEffect, useState } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import Title from "../components/Title/Title";
// import { IoMdArrowDropdown } from "react-icons/io";
// import ProductItem from "../components/ProductItem/ProductItem";
// import { ShopRepo } from "../data/Repo/ShopRepo";
// import { domain } from "../store";
// export default function Shopping() {
//   const [showFilters, setShowFilters] = useState(true);
//   const [products, setProducts] = useState();
//   const [productPerPage, setProductPerPage] = useState(5);
//   const [cats, setCats] = useState([]);
//   const [subCats, setSubCats] = useState([]);
//   const [filterProducts, setFilterProducts] = useState({
//     categories: [],
//     subCategories: [],
//   });
//   const [productsTotal, setProductsTotal] = useState(0);
//   const [activePage, setActivePage] = useState(2);

//   const handleFilters = (id, type) => {
//     const copy = [
//       ...(type === "category"
//         ? filterProducts.categories
//         : filterProducts.subCategories),
//     ];

//     const index = copy.indexOf(id);
//     if (index > -1) {
//       copy.splice(index, 1);
//     } else {
//       copy.push(id);
//     }

//     setFilterProducts((prev) => ({
//       ...prev,
//       [type]: copy,
//     }));
//   };

//   useEffect(() => {
//     ShopRepo.categories_index().then(setCats);
//     ShopRepo.subCategories_index().then(setSubCats);
//     ShopRepo.index_productItems(
//       activePage,
//       productPerPage,
//       filterProducts
//     ).then((res) => {
//       setProducts(res.data);
//       setProductsTotal(res.total);
//     });
//   }, [activePage, productPerPage, filterProducts]);

//   useEffect(() => {
//     setActivePage(1);
//   }, [productPerPage]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
//       {/* Filter Option */}
//       <div className="min-w-60">
//         <p className='uppercase my-2 text-xl flex items-center cursor-pointer gap-2"'>
//           filters
//           <MdKeyboardArrowDown
//             className={`h-3 sm:hidden ${showFilters ? "rotate-270" : ""}`}
//           />
//         </p>
//         {/* Category Filter */}
//         <div
//           className={`border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white ${
//             showFilters ? "" : "hidden"
//           } sm:block transition-all duration-300`}
//         >
//           <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
//             CATEGORIES
//           </p>
//           <div className="flex flex-col gap-3 text-sm text-gray-700">
//             {cats &&
//               Array.isArray(cats) &&
//               cats.map((el, index) => (
//                 <label
//                   key={el.documentId}
//                   onChange={() => handleFilters(el.documentId, "categories")}
//                   checked={filterProducts.categories.includes(el.documentId)}
//                   className="flex items-center gap-3 cursor-pointer group"
//                 >
//                   <div className="relative flex items-center justify-center">
//                     <input
//                       type="checkbox"

//                       className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                     />
//                   </div>
//                   <span className="group-hover:text-indigo-600 transition-colors duration-200">
//                     {el.CategoryName}
//                   </span>
//                 </label>
//               ))}

//             {/* {["Men", "Women", "Kids"].map((item) => (
//               <label
//                 key={item}
//                 className="flex items-center gap-3 cursor-pointer group"
//               >
//                 <div className="relative flex items-center justify-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                     // onChange={toggleCategory}
//                     // value={item}
//                     // checked={category.includes(item)}
//                   />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors duration-200">
//                   {item}
//                 </span>
//               </label>
//             ))} */}
//           </div>
//         </div>

//         {/* SubCategory Filter */}
//         <div
//           className={`border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white ${
//             showFilters ? "" : "hidden"
//           } sm:block transition-all duration-300`}
//         >
//           <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
//             TYPE
//           </p>
//           <div className="flex flex-col gap-3 text-sm text-gray-700">
//             {subCats &&
//               Array.isArray(subCats) &&
//               subCats.map((el, index) => (
//                 <label
//                   key={el.documentId}
//                   onChange={() => handleFilters(el.documentId, "categories")}
//                   checked={filterProducts.categories.includes(el.documentId)}
//                   className="flex items-center gap-3 cursor-pointer group"
//                 >
//                   <div className="relative flex items-center justify-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                     />
//                   </div>
//                   <span className="group-hover:text-indigo-600 transition-colors duration-200">
//                     {el.SubName}
//                   </span>
//                 </label>
//               ))}
//             {/* {[
//               { value: "Topwear", label: "Top wear" },
//               { value: "Bottomwear", label: "Bottom wear" },
//               { value: "Winterwear", label: "Winter wear" },
//             ].map((item) => (
//               <label
//                 key={item.value}
//                 className="flex items-center gap-3 cursor-pointer group"
//               >
//                 <div className="relative flex items-center justify-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                     // onChange={toggleSubCategory}
//                     // value={item.value}
//                     // checked={subCategory.includes(item.value)}
//                   />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors duration-200">
//                   {item.label}
//                 </span>
//               </label>
//             ))} */}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1">
//         {/* Title & Selector */}
//         <div className="flex flex-col md:flex-row justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"All"} text2={"COLLECTIONS"} />
//           {/* Product Sort */}
//           <div className="relative w-full max-w-xs">
//             <select
//               // onChange={(e) => setSortType(e.target.value)}
//               className="block w-full appearance-none bg-white border  border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
//             >
//               <option value="Relevant">Sort by: Relevant</option>
//               <option value="low-high">Sort by: Low To High</option>
//               <option value="high-low">Sort by: High To Low</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <IoMdArrowDropdown
//                 className="h-5 w-5 text-gray-500"
//                 aria-hidden="true"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//           {products && Array.isArray(products) && products.length > 0 ? (
//             products.map((el) => (
//               <ProductItem
//                 key={el.documentId}
//                 name={el.name}
//                 imgUrl={
//                   el.image?.[0]?.url ? domain + el.image[0].url : undefined
//                 }
//                 price={el.price}
//               />
//             ))
//           ) : (
//             <div className="w-full bg-gray-50 rounded-lg py-16 text-center">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">
//                 No products found
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 Try changing your search or filter criteria.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Title from "../components/Title/Title";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductItem from "../components/ProductItem/ProductItem";
import { ShopRepo } from "../data/Repo/ShopRepo";
import { domain } from "../store";

export default function Shopping() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);

  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [filterProducts, setFilterProducts] = useState({
    categories: [],
    subCategories: [],
  });
  const [activePage, setActivePage] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productPerPage, setProductPerPage] = useState(5);

  const [sortType, setSortType] = useState("Relevant");

  const handleFilters = (id, type) => {
    const fieldName = type === "category" ? "categories" : "subCategories";
    const copy = [...filterProducts[fieldName]];

    const index = copy.indexOf(id);
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(id);
    }

    setFilterProducts((prev) => ({
      ...prev,
      [fieldName]: copy,
    }));
  };

  // Logic for Sorting
  const handleSort = (productsToSort) => {
    if (!productsToSort || !Array.isArray(productsToSort)) return [];

    let productsCopy = [...productsToSort];

    switch (sortType) {
      case "low-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy; // No sorting, return original
    }
  };

  useEffect(() => {
    ShopRepo.categories_index().then(setCats);
    ShopRepo.subCategories_index().then(setSubCats);
    ShopRepo.index_productItems(
      activePage,
      productPerPage,
      filterProducts
    ).then((res) => {
      const sortedProducts = handleSort(res.data);
      setProducts(sortedProducts);
      setProductsTotal(res.total);
      // console.log(res);
    });
  }, [activePage, productPerPage, filterProducts, sortType]);

  useEffect(() => {
    setActivePage(1);
  }, [productPerPage, filterProducts]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Calculate total pages
  const totalPages = Math.ceil(productsTotal / productPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      // Scroll to top of product section
      window.scrollTo({
        top: document.querySelector(".flex-1")?.offsetTop - 20 || 0,
        behavior: "smooth",
      });
    }
  };

  // Handle products per page change
  const handlePerPageChange = (e) => {
    setProductPerPage(Number(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Filter Option */}
      <div className="min-w-60">
        <p
          className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={toggleFilters}
        >
          filters
          <MdKeyboardArrowDown
            className={`h-3 sm:hidden ${showFilters ? "rotate-180" : ""}`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white ${
            showFilters ? "" : "hidden"
          } sm:block transition-all duration-300`}
        >
          <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {cats &&
              Array.isArray(cats) &&
              cats.map((el) => (
                <label
                  key={el.documentId}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      onChange={() => handleFilters(el.documentId, "category")}
                      checked={filterProducts.categories.includes(
                        el.documentId
                      )}
                    />
                  </div>
                  <span className="group-hover:text-indigo-600 transition-colors duration-200">
                    {el.CategoryName}
                  </span>
                </label>
              ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white ${
            showFilters ? "" : "hidden"
          } sm:block transition-all duration-300`}
        >
          <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
            TYPE
          </p>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {subCats &&
              Array.isArray(subCats) &&
              subCats.map((el) => (
                <label
                  key={el.documentId}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      onChange={() =>
                        handleFilters(el.documentId, "subCategory")
                      }
                      checked={filterProducts.subCategories.includes(
                        el.documentId
                      )}
                    />
                  </div>
                  <span className="group-hover:text-indigo-600 transition-colors duration-200">
                    {el.SubName}
                  </span>
                </label>
              ))}
          </div>
        </div>

        {/* Items Per Page */}
        <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
          <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
            ITEMS PER PAGE
          </p>
          <select
            className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            value={productPerPage}
            onChange={handlePerPageChange}
          >
            <option value="5">5 Items</option>
            <option value="10">10 Items</option>
            <option value="15">15 Items</option>
            <option value="20">20 Items</option>
          </select>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Title & Selector */}
        <div className="flex flex-col md:flex-row justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <div className="relative w-full max-w-xs">
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
            >
              <option value="Relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low To High</option>
              <option value="high-low">Sort by: High To Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((el) => (
              <ProductItem
                key={el.documentId}
                id={el.documentId}
                name={el.name}
                imgUrl={
                  el.image?.[0]?.url ? domain + el.image[0].url : undefined
                }
                price={el.price}
              />
            ))
          ) : (
            <div className="w-full bg-gray-50 rounded-lg py-16 text-center col-span-3">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="w-full my-4">
            <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {activePage > 1 && (
                  <a
                    className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    aria-label="Previous"
                    onClick={() => handlePageChange(activePage - 1)}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}

                {Array.from({ length: totalPages }, (_, index) => (
                  <a
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer
                    ${
                      activePage === index + 1
                        ? "bg-black text-white border border-black"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </a>
                ))}

                {activePage < totalPages && (
                  <a
                    className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    aria-label="Next"
                    onClick={() => handlePageChange(activePage + 1)}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
