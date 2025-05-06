// import React, { useEffect, useState } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import Title from "../components/Title/Title";
// import ProductItem from "../components/ProductItem/ProductItem";
// import { ShopRepo } from "../data/Repo/ShopRepo";
// import { domain, useSearchStore } from "../store";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ChevronDown,
//   ChevronUp,
//   Filter,
//   Search,
//   SlidersHorizontal,
//   X,
// } from "lucide-react";

// export default function Shopping() {
//   const [showFilters, setShowFilters] = useState(true);
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayProducts, setDisplayProducts] = useState([]);
//   const { search, showSearch } = useSearchStore();
//   const [cats, setCats] = useState([]);
//   const [subCats, setSubCats] = useState([]);
//   const [filterProducts, setFilterProducts] = useState({
//     categories: [],
//     subCategories: [],
//   });
//   const [activePage, setActivePage] = useState(1);
//   const [productsTotal, setProductsTotal] = useState(0);
//   const [productPerPage, setProductPerPage] = useState(8);
//   const [sortType, setSortType] = useState("Relevant");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [categories, subCategories, productsResponse] = await Promise.all(
//           [
//             ShopRepo.categories_index(),
//             ShopRepo.subCategories_index(),
//             ShopRepo.index_productItems(1, 100, {}),
//           ]
//         );

//         setCats(categories || []);
//         setSubCats(subCategories || []);

//         if (productsResponse?.data) {
//           setAllProducts(productsResponse.data);
//           setProductsTotal(
//             productsResponse.total || productsResponse.data.length
//           );
//         }
//       } catch (error) {
//         console.error("Error loading shop data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!allProducts.length) return;

//     let filtered = [...allProducts];

//     // Apply search filter if active
//     if (showSearch && search) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Apply category filters
//     if (filterProducts.categories.length > 0) {
//       filtered = filtered.filter((p) =>
//         filterProducts.categories.includes(p.category.documentId)
//       );
//     }

//     // Apply subcategory filters
//     if (filterProducts.subCategories.length > 0) {
//       filtered = filtered.filter((p) =>
//         filterProducts.subCategories.includes(p.sub_category.documentId)
//       );
//     }

//     // Apply sorting
//     switch (sortType) {
//       case "low-high":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "high-low":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }

//     setDisplayProducts(filtered);
//     setProductsTotal(filtered.length);

//     if (activePage !== 1) {
//       setActivePage(1);
//     }
//   }, [allProducts, search, showSearch, filterProducts, sortType]);

//   const toggleFilters = () => setShowFilters(!showFilters);

//   const handleFilters = (documentId, type) => {
//     setFilterProducts((prev) => {
//       const field = type === "category" ? "categories" : "subCategories";
//       const current = prev[field];
//       const updated = current.includes(documentId)
//         ? current.filter((i) => i !== documentId)
//         : [...current, documentId];
//       return { ...prev, [field]: updated };
//     });
//   };

//   // Calculate total pages for pagination
//   const totalPages = Math.ceil(productsTotal / productPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setActivePage(page);
//       window.scrollTo({
//         top: document.querySelector(".flex-1")?.offsetTop - 20 || 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Get current page products
//   const paginatedProducts = displayProducts.slice(
//     (activePage - 1) * productPerPage,
//     activePage * productPerPage
//   );

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
//       {/* Sidebar Filters */}
//       <div className="min-w-60">
//         <p
//           onClick={toggleFilters}
//           className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           filters
//           <MdKeyboardArrowDown
//             className={`h-3 sm:hidden ${showFilters ? "rotate-180" : ""}`}
//           />
//         </p>

//         {/* Categories */}
//         {showFilters && (
//           <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
//             <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
//               CATEGORIES
//             </p>
//             {cats.map((el) => (
//               <label
//                 key={el.documentId}
//                 className="flex items-center gap-3 cursor-pointer group"
//               >
//                 <input
//                   type="checkbox"
//                   onChange={() => handleFilters(el.documentId, "category")}
//                   checked={filterProducts.categories.includes(el.documentId)}
//                   className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                 />
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   {el.CategoryName}
//                 </span>
//               </label>
//             ))}
//           </div>
//         )}

//         {/* SubCategories */}
//         {showFilters && (
//           <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
//             <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
//               TYPE
//             </p>
//             {subCats.map((el) => (
//               <label
//                 key={el.documentId}
//                 className="flex items-center gap-3 cursor-pointer group"
//               >
//                 <input
//                   type="checkbox"
//                   onChange={() => handleFilters(el.documentId, "subCategory")}
//                   checked={filterProducts.subCategories.includes(el.documentId)}
//                   className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
//                 />
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   {el.SubName}
//                 </span>
//               </label>
//             ))}
//           </div>
//         )}

//         {/* Items Per Page */}
//         <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
//           <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
//             ITEMS PER PAGE
//           </p>
//           <select
//             value={productPerPage}
//             onChange={(e) => setProductPerPage(Number(e.target.value))}
//             className="block w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none appearance-none"
//           >
//             <option value={8}>8 Items</option>
//             <option value={10}>10 Items</option>
//             <option value={15}>15 Items</option>
//             <option value={20}>20 Items</option>
//           </select>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="flex-1">
//         <div className="flex flex-col md:flex-row justify-between text-base sm:text-2xl mb-4">
//           <Title text1="All" text2="COLLECTIONS" />
//           <div className="relative w-full max-w-xs">
//             <select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//               className="block w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none appearance-none"
//             >
//               <option value="Relevant">Sort by: Relevant</option>
//               <option value="low-high">Sort by: Low To High</option>
//               <option value="high-low">Sort by: High To Low</option>
//             </select>
//             <IoMdArrowDropdown className="absolute right-3 top-2 text-gray-500" />
//           </div>
//         </div>

//         {/* Search Info */}
//         {showSearch && search && (
//           <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm">
//               Showing results for:{" "}
//               <span className="font-semibold">{search}</span>{" "}
//               {displayProducts.length === 0 ? (
//                 <span className="text-red-500 ml-2">No matches found</span>
//               ) : (
//                 <span className="text-gray-600 ml-2">
//                   ({displayProducts.length} product
//                   {displayProducts.length !== 1 ? "s" : ""} found)
//                 </span>
//               )}
//             </p>
//           </div>
//         )}

//         {/* Loading state */}
//         {isLoading ? (
//           <div className="w-full text-center py-20">
//             <div
//               className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//               role="status"
//             >
//               <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//                 Loading...
//               </span>
//             </div>
//             <p className="mt-2 text-gray-600">Loading products...</p>
//           </div>
//         ) : (
//           <>
//             {/* Products Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {paginatedProducts.length > 0 ? (
//                 paginatedProducts.map((el) => (
//                   <ProductItem
//                     key={el.documentId}
//                     id={el.documentId}
//                     name={el.name}
//                     imgUrl={
//                       el.image?.[0]?.url ? domain + el.image[0].url : undefined
//                     }
//                     price={el.price}
//                     bestSeller={el.bestSeller}
//                     category={el.category}
//                     sub_category={el.subCategory}
//                   />
//                 ))
//               ) : (
//                 <div className="w-full col-span-full text-center py-16">
//                   <h3 className="text-lg font-semibold">No products found</h3>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Try changing your search or filter criteria.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Pagination */}
//             {totalPages > 0 && (
//               <div className="w-full my-4">
//                 <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
//                   <nav
//                     className="inline-flex rounded-md shadow-sm -space-x-px"
//                     aria-label="Pagination"
//                   >
//                     {activePage > 1 && (
//                       <a
//                         className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 cursor-pointer"
//                         aria-label="Previous"
//                         onClick={() => handlePageChange(activePage - 1)}
//                       >
//                         <span className="sr-only">Previous</span>
//                         <svg
//                           className="h-5 w-5"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                           aria-hidden="true"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </a>
//                     )}

//                     {Array.from({ length: totalPages }, (_, index) => (
//                       <a
//                         key={index}
//                         onClick={() => handlePageChange(index + 1)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer
//                         ${
//                           activePage === index + 1
//                             ? "bg-black text-white border border-black"
//                             : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         {index + 1}
//                       </a>
//                     ))}

//                     {activePage < totalPages && (
//                       <a
//                         className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 cursor-pointer"
//                         aria-label="Next"
//                         onClick={() => handlePageChange(activePage + 1)}
//                       >
//                         <span className="sr-only">Next</span>
//                         <svg
//                           className="h-5 w-5"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                           aria-hidden="true"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </a>
//                     )}
//                   </nav>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function ShoppingPage() {
//   // Original state variables
//   const [showFilters, setShowFilters] = useState(true);
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayProducts, setDisplayProducts] = useState([]);
//   const { search, showSearch } = useSearchStore();
//   const [cats, setCats] = useState([]);
//   const [subCats, setSubCats] = useState([]);
//   const [showTypeFilters, setShowTypeFilters] = useState(true);
//   const [filterProducts, setFilterProducts] = useState({
//     categories: [],
//     subCategories: [],
//   });
//   const [activePage, setActivePage] = useState(1);
//   const [productsTotal, setProductsTotal] = useState(0);
//   const [productPerPage, setProductPerPage] = useState(8);
//   const [sortType, setSortType] = useState("Relevant");
//   const [isLoading, setIsLoading] = useState(true);

//   // New state variables for the redesign
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [activeFilterTab, setActiveFilterTab] = useState("categories");

//   // Original data fetching logic
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [categories, subCategories, productsResponse] = await Promise.all(
//           [
//             ShopRepo.categories_index(),
//             ShopRepo.subCategories_index(),
//             ShopRepo.index_productItems(1, 100, {}),
//           ]
//         );

//         setCats(categories || []);
//         setSubCats(subCategories || []);

//         if (productsResponse?.data) {
//           setAllProducts(productsResponse.data);
//           setDisplayProducts(productsResponse.data);
//           setProductsTotal(
//             productsResponse.total || productsResponse.data.length
//           );
//         }
//       } catch (error) {
//         console.error("Error loading shop data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Original filtering logic
//   useEffect(() => {
//     if (!allProducts.length) return;

//     let filtered = [...allProducts];

//     // Apply search filter if active
//     if (showSearch && search) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Apply category filters
//     if (filterProducts.categories.length > 0) {
//       filtered = filtered.filter((p) =>
//         filterProducts.categories.includes(p.category.documentId)
//       );
//     }

//     // Apply subcategory filters
//     if (filterProducts.subCategories.length > 0) {
//       filtered = filtered.filter((p) =>
//         filterProducts.subCategories.includes(p.sub_category.documentId)
//       );
//     }

//     // Apply sorting
//     switch (sortType) {
//       case "low-high":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "high-low":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }

//     setDisplayProducts(filtered);
//     setProductsTotal(filtered.length);

//     if (activePage !== 1) {
//       setActivePage(1);
//     }
//   }, [allProducts, search, showSearch, filterProducts, sortType]);

//   // Original filter handlers
//   const handleFilters = (documentId, type) => {
//     setFilterProducts((prev) => {
//       const field = type === "category" ? "categories" : "subCategories";
//       const current = prev[field];
//       const updated = current.includes(documentId)
//         ? current.filter((i) => i !== documentId)
//         : [...current, documentId];
//       return { ...prev, [field]: updated };
//     });
//   };

//   // Calculate pagination
//   const totalPages = Math.ceil(productsTotal / productPerPage);
//   const paginatedProducts = displayProducts.slice(
//     (activePage - 1) * productPerPage,
//     activePage * productPerPage
//   );

//   // Handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setActivePage(page);
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="bg-white">
//       {/* Header with search and filter buttons */}
//       <div className="sticky top-0 z-20 border-b border-gray-200 bg-white py-4 shadow-sm">
//         <div className="flex flex-col lg:flex-row items-center justify-between px-4">
//           <div className="mb-3 md:mb-0">
//             <Title text1="MODERN" text2="COLLECTIONS" />
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Mobile filter toggle */}
//             <button
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//               className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium lg:hidden"
//             >
//               <Filter size={16} />
//               <span>Filters</span>
//             </button>

//             {/* Sort dropdown */}
//             <div className="relative">
//               <select
//                 value={sortType}
//                 onChange={(e) => setSortType(e.target.value)}
//                 className="rounded-full border border-gray-200 bg-white px-4 py-2 pr-8 text-sm font-medium shadow-sm focus:border-gray-300 focus:outline-none appearance-none"
//               >
//                 <option value="Relevant">Sort: Relevant</option>
//                 <option value="low-high">Sort: Price Low-High</option>
//                 <option value="high-low">Sort: Price High-Low</option>
//               </select>
//               <ChevronDown
//                 size={16}
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 pb-12 pt-6">
//         <div className="flex flex-col gap-6 lg:flex-row">
//           {/* Mobile filter sidebar */}
//           <div
//             className={`fixed inset-0 z-30 transform ${
//               mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
//             } bg-white transition-transform duration-300 lg:hidden`}
//           >
//             <div className="flex h-full flex-col overflow-y-auto p-4">
//               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
//                 <h2 className="text-lg font-semibold">Filters</h2>
//                 <button
//                   onClick={() => setMobileFiltersOpen(false)}
//                   className="rounded-full p-1 hover:bg-gray-100"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="mt-4 flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setActiveFilterTab("categories")}
//                   className={`rounded-full px-4 py-2 text-sm font-medium ${
//                     activeFilterTab === "categories"
//                       ? "bg-black text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Categories
//                 </button>
//                 <button
//                   onClick={() => setActiveFilterTab("types")}
//                   className={`rounded-full px-4 py-2 text-sm font-medium ${
//                     activeFilterTab === "types"
//                       ? "bg-black text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Types
//                 </button>
//                 <button
//                   onClick={() => setActiveFilterTab("perPage")}
//                   className={`rounded-full px-4 py-2 text-sm font-medium ${
//                     activeFilterTab === "perPage"
//                       ? "bg-black text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Items Per Page
//                 </button>
//               </div>

//               <div className="mt-6 flex-1 overflow-y-auto">
//                 {activeFilterTab === "categories" && (
//                   <div className="space-y-2">
//                     <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
//                       Categories
//                     </h3>
//                     {cats.map((el) => (
//                       <label
//                         key={el.documentId}
//                         className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
//                       >
//                         <input
//                           type="checkbox"
//                           onChange={() =>
//                             handleFilters(el.documentId, "category")
//                           }
//                           checked={filterProducts.categories.includes(
//                             el.documentId
//                           )}
//                           className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                         />
//                         <span>{el.CategoryName}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}

//                 {activeFilterTab === "types" && (
//                   <div className="space-y-2">
//                     <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
//                       Types
//                     </h3>
//                     {subCats.map((el) => (
//                       <label
//                         key={el.documentId}
//                         className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
//                       >
//                         <input
//                           type="checkbox"
//                           onChange={() =>
//                             handleFilters(el.documentId, "subCategory")
//                           }
//                           checked={filterProducts.subCategories.includes(
//                             el.documentId
//                           )}
//                           className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                         />
//                         <span>{el.SubName}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}

//                 {activeFilterTab === "perPage" && (
//                   <div className="space-y-2">
//                     <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
//                       Items Per Page
//                     </h3>
//                     <select
//                       value={productPerPage}
//                       onChange={(e) =>
//                         setProductPerPage(Number(e.target.value))
//                       }
//                       className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
//                     >
//                       <option value={8}>8 Items</option>
//                       <option value={12}>12 Items</option>
//                       <option value={16}>16 Items</option>
//                       <option value={24}>24 Items</option>
//                     </select>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4 border-t border-gray-200 pt-4">
//                 <button
//                   onClick={() => {
//                     setFilterProducts({ categories: [], subCategories: [] });
//                     setMobileFiltersOpen(false);
//                   }}
//                   className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Desktop filters sidebar */}
//           <div className="hidden w-64 shrink-0 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:block">
//             <div>
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-semibold uppercase text-gray-900">
//                   Categories
//                 </h3>
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="text-gray-500"
//                 >
//                   {showFilters ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   )}
//                 </button>
//               </div>

//               {showFilters && (
//                 <div className="mt-4 space-y-2">
//                   {cats.map((el) => (
//                     <label
//                       key={el.documentId}
//                       className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
//                     >
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleFilters(el.documentId, "category")
//                         }
//                         checked={filterProducts.categories.includes(
//                           el.documentId
//                         )}
//                         className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                       />
//                       <span>{el.CategoryName}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-gray-200 pt-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-semibold uppercase text-gray-900">
//                   Types
//                 </h3>
//                 <button
//                   onClick={() => setShowTypeFilters(!showTypeFilters)}
//                   className="text-gray-500"
//                 >
//                   {showTypeFilters ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   )}
//                 </button>
//               </div>
//               {showTypeFilters && (
//                 <div className="mt-4 space-y-2">
//                   {subCats.map((el) => (
//                     <label
//                       key={el.documentId}
//                       className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
//                     >
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleFilters(el.documentId, "subCategory")
//                         }
//                         checked={filterProducts.subCategories.includes(
//                           el.documentId
//                         )}
//                         className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                       />
//                       <span>{el.SubName}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
//                 Items Per Page
//               </h3>
//               <select
//                 value={productPerPage}
//                 onChange={(e) => setProductPerPage(Number(e.target.value))}
//                 className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
//               >
//                 <option value={8}>8 Items</option>
//                 <option value={12}>12 Items</option>
//                 <option value={16}>16 Items</option>
//                 <option value={24}>24 Items</option>
//               </select>
//             </div>

//             {(filterProducts.categories.length > 0 ||
//               filterProducts.subCategories.length > 0) && (
//               <div className="border-t border-gray-200 pt-4">
//                 <button
//                   onClick={() =>
//                     setFilterProducts({ categories: [], subCategories: [] })
//                   }
//                   className="flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Main content */}
//           <div className="flex-1">
//             {/* Search results info */}
//             {showSearch && search && (
//               <div className="mb-6 rounded-lg bg-gray-50 p-4">
//                 <p className="flex items-center gap-2 text-sm">
//                   <Search size={16} />
//                   <span>
//                     Showing results for:{" "}
//                     <span className="font-semibold">{search}</span>
//                   </span>
//                   {displayProducts.length === 0 ? (
//                     <span className="ml-2 text-red-500">No matches found</span>
//                   ) : (
//                     <span className="ml-2 text-gray-600">
//                       ({displayProducts.length} product
//                       {displayProducts.length !== 1 ? "s" : ""})
//                     </span>
//                   )}
//                 </p>
//               </div>
//             )}

//             {/* Applied filters */}
//             {(filterProducts.categories.length > 0 ||
//               filterProducts.subCategories.length > 0) && (
//               <div className="mb-6">
//                 <div className="flex flex-wrap gap-2">
//                   {filterProducts.categories.map((catId) => {
//                     const category = cats.find((c) => c.documentId === catId);
//                     return category ? (
//                       <div
//                         key={catId}
//                         className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
//                       >
//                         <span>{category.CategoryName}</span>
//                         <button
//                           onClick={() => handleFilters(catId, "category")}
//                           className="ml-1 rounded-full p-1 hover:bg-gray-200"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ) : null;
//                   })}

//                   {filterProducts.subCategories.map((subId) => {
//                     const subCategory = subCats.find(
//                       (s) => s.documentId === subId
//                     );
//                     return subCategory ? (
//                       <div
//                         key={subId}
//                         className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
//                       >
//                         <span>{subCategory.SubName}</span>
//                         <button
//                           onClick={() => handleFilters(subId, "subCategory")}
//                           className="ml-1 rounded-full p-1 hover:bg-gray-200"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ) : null;
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Loading state */}
//             {isLoading ? (
//               <div className="flex min-h-64 flex-col items-center justify-center py-20">
//                 <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
//                 <p className="mt-4 text-gray-600">Loading products...</p>
//               </div>
//             ) : (
//               <>
//                 {/* Products grid */}
//                 {paginatedProducts.length > 0 ? (
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
//                     {paginatedProducts.map((product) => (
//                       <ProductItem
//                         key={product.documentId}
//                         id={product.documentId}
//                         name={product.name}
//                         imgUrl={
//                           product.image?.[0]?.url
//                             ? domain + product.image[0].url
//                             : undefined
//                         }
//                         price={product.price}
//                         bestSeller={product.bestSeller}
//                         category={product.category}
//                         sub_category={product.sub_category}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-20 text-center">
//                     <SlidersHorizontal
//                       size={32}
//                       className="mb-3 text-gray-400"
//                     />
//                     <h3 className="text-lg font-semibold">No products found</h3>
//                     <p className="mt-2 text-sm text-gray-500">
//                       Try adjusting your filters or search term
//                     </p>
//                     <button
//                       onClick={() => {
//                         setFilterProducts({
//                           categories: [],
//                           subCategories: [],
//                         });
//                         useSearchStore.getState().closeSearch();
//                       }}
//                       className="mt-4 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
//                     >
//                       Clear all filters
//                     </button>
//                   </div>
//                 )}

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="mt-10 flex items-center justify-center">
//                     <div className="flex items-center space-x-1">
//                       {/* Previous Button */}
//                       <button
//                         onClick={() => handlePageChange(activePage - 1)}
//                         disabled={activePage === 1}
//                         className={`flex h-10 w-10 items-center justify-center rounded-full ${
//                           activePage === 1
//                             ? "cursor-not-allowed bg-gray-100 text-gray-400"
//                             : "bg-white text-gray-700 hover:bg-gray-100"
//                         } border border-gray-200`}
//                       >
//                         <ArrowLeft size={16} />
//                       </button>

//                       {/* Page Numbers */}
//                       <div className="flex items-center space-x-1">
//                         {/* First Page */}
//                         <button
//                           onClick={() => handlePageChange(1)}
//                           className={`flex h-10 w-10 items-center justify-center rounded-full ${
//                             activePage === 1
//                               ? "bg-black text-white"
//                               : "bg-white text-gray-700 hover:bg-gray-100"
//                           } border border-gray-200`}
//                         >
//                           1
//                         </button>

//                         {/* Dots after first page
//                         {activePage > 4 && totalPages > 4 && (
//                           <span className="flex h-10 w-5 items-center justify-center">
//                             ...
//                           </span>
//                         )} */}

//                         {/* Middle Pages */}
//                         {Array.from({ length: totalPages }, (_, i) => i + 1)
//                           .filter(
//                             (page) =>
//                               page !== 1 &&
//                               page !== totalPages &&
//                               page >= activePage - 1 &&
//                               page <= activePage + 1
//                           )
//                           .map((page) => (
//                             <button
//                               key={page}
//                               onClick={() => handlePageChange(page)}
//                               className={`flex h-10 w-10 items-center justify-center rounded-full ${
//                                 activePage === page
//                                   ? "bg-black text-white"
//                                   : "bg-white text-gray-700 hover:bg-gray-100"
//                               } border border-gray-200`}
//                             >
//                               {page}
//                             </button>
//                           ))}

//                         {/* Dots before last page */}
//                         {activePage < totalPages - 3 && totalPages > 3 && (
//                           <span className="flex h-10 w-5 items-center justify-center">
//                             ...
//                           </span>
//                         )}

//                         {/* Last Page */}
//                         {totalPages !== 1 && (
//                           <button
//                             onClick={() => handlePageChange(totalPages)}
//                             className={`flex h-10 w-10 items-center justify-center rounded-full ${
//                               activePage === totalPages
//                                 ? "bg-black text-white"
//                                 : "bg-white text-gray-700 hover:bg-gray-100"
//                             } border border-gray-200`}
//                           >
//                             {totalPages}
//                           </button>
//                         )}
//                       </div>

//                       {/* Next Button */}
//                       <button
//                         onClick={() => handlePageChange(activePage + 1)}
//                         disabled={activePage === totalPages}
//                         className={`flex h-10 w-10 items-center justify-center rounded-full ${
//                           activePage === totalPages
//                             ? "cursor-not-allowed bg-gray-100 text-gray-400"
//                             : "bg-white text-gray-700 hover:bg-gray-100"
//                         } border border-gray-200`}
//                       >
//                         <ArrowRight size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
