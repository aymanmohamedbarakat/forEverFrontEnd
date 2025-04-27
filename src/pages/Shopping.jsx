import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Title from "../components/Title/Title";
import ProductItem from "../components/ProductItem/ProductItem";
import { ShopRepo } from "../data/Repo/ShopRepo";
import { domain } from "../store";
import { useSearchStore } from "../Hooks/uiStore";

export default function Shopping() {
  const [showFilters, setShowFilters] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const { search, showSearch } = useSearchStore();
  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [filterProducts, setFilterProducts] = useState({
    categories: [],
    subCategories: [],
  });
  const [activePage, setActivePage] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productPerPage, setProductPerPage] = useState(8);
  const [sortType, setSortType] = useState("Relevant");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categories, subCategories, productsResponse] = await Promise.all(
          [
            ShopRepo.categories_index(),
            ShopRepo.subCategories_index(),
            ShopRepo.index_productItems(1, 100, {}),
          ]
        );

        setCats(categories || []);
        setSubCats(subCategories || []);

        if (productsResponse?.data) {
          setAllProducts(productsResponse.data);
          setProductsTotal(
            productsResponse.total || productsResponse.data.length
          );
        }
      } catch (error) {
        console.error("Error loading shop data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = [...allProducts];

    // Apply search filter if active
    if (showSearch && search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filters
    if (filterProducts.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filterProducts.categories.includes(p.category)
      );
    }

    // Apply subcategory filters
    if (filterProducts.subCategories.length > 0) {
      filtered = filtered.filter((p) =>
        filterProducts.subCategories.includes(p.subCategory)
      );
    }

    // Apply sorting
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setDisplayProducts(filtered);
    setProductsTotal(filtered.length);

    if (activePage !== 1) {
      setActivePage(1);
    }
  }, [allProducts, search, showSearch, filterProducts, sortType]);

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleFilters = (id, type) => {
    setFilterProducts((prev) => {
      const field = type === "category" ? "categories" : "subCategories";
      const current = prev[field];
      const updated = current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id];
      return { ...prev, [field]: updated };
    });
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(productsTotal / productPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      window.scrollTo({
        top: document.querySelector(".flex-1")?.offsetTop - 20 || 0,
        behavior: "smooth",
      });
    }
  };

  // Get current page products
  const paginatedProducts = displayProducts.slice(
    (activePage - 1) * productPerPage,
    activePage * productPerPage
  );

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Sidebar Filters */}
      <div className="min-w-60">
        <p
          onClick={toggleFilters}
          className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          filters
          <MdKeyboardArrowDown
            className={`h-3 sm:hidden ${showFilters ? "rotate-180" : ""}`}
          />
        </p>

        {/* Categories */}
        {showFilters && (
          <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
            <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
              CATEGORIES
            </p>
            {cats.map((el) => (
              <label
                key={el.documentId}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  onChange={() => handleFilters(el.documentId, "category")}
                  checked={filterProducts.categories.includes(el.documentId)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="group-hover:text-indigo-600 transition-colors">
                  {el.CategoryName}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* SubCategories */}
        {showFilters && (
          <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
            <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
              TYPE
            </p>
            {subCats.map((el) => (
              <label
                key={el.documentId}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  onChange={() => handleFilters(el.documentId, "subCategory")}
                  checked={filterProducts.subCategories.includes(el.documentId)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="group-hover:text-indigo-600 transition-colors">
                  {el.SubName}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Items Per Page */}
        <div className="border border-gray-200 rounded-lg shadow-sm px-5 py-4 my-5 bg-white">
          <p className="uppercase mb-4 text-sm font-medium tracking-wider border-b border-gray-100 pb-2">
            ITEMS PER PAGE
          </p>
          <select
            value={productPerPage}
            onChange={(e) => setProductPerPage(Number(e.target.value))}
            className="block w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none appearance-none"
          >
            <option value={8}>8 Items</option>
            <option value={10}>10 Items</option>
            <option value={15}>15 Items</option>
            <option value={20}>20 Items</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between text-base sm:text-2xl mb-4">
          <Title text1="All" text2="COLLECTIONS" />
          <div className="relative w-full max-w-xs">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none appearance-none"
            >
              <option value="Relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low To High</option>
              <option value="high-low">Sort by: High To Low</option>
            </select>
            <IoMdArrowDropdown className="absolute right-3 top-2 text-gray-500" />
          </div>
        </div>

        {/* Search Info */}
        {showSearch && search && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              Showing results for:{" "}
              <span className="font-semibold">{search}</span>{" "}
              {displayProducts.length === 0 ? (
                <span className="text-red-500 ml-2">No matches found</span>
              ) : (
                <span className="text-gray-600 ml-2">
                  ({displayProducts.length} product
                  {displayProducts.length !== 1 ? "s" : ""} found)
                </span>
              )}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="w-full text-center py-20">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((el) => (
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
                    sub_category={el.subCategory}
                  />
                ))
              ) : (
                <div className="w-full col-span-full text-center py-16">
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p className="text-sm text-gray-500 mt-2">
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
                        className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 cursor-pointer"
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
                        className="flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 cursor-pointer"
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
          </>
        )}
      </div>
    </div>
  );
}
