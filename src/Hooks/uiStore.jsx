import { create } from "zustand";
import { ShopRepo } from "../data/Repo/ShopRepo";

export const useLinks = create(() => {
  const Links = [
    { name: "HOME", url: "/" },
    { name: "SHOPPING", url: "/shopping" },
    { name: "ABOUT", url: "/about" },
    { name: "CONTACT", url: "/contact" },
  ];
  return { Links };
});

export const useSideHeader = create((set) => ({
  index: false,
  openSideHeader: () => set(() => ({ index: true })),
  closeSideHeader: () => set(() => ({ index: false })),
}));

export const useSearchStore = create((set) => ({
  search: "",
  showSearch: false,

  setSearch: (value) => set({ search: value }),
  openSearch: () => set({ showSearch: true }),
  closeSearch: () => set({ showSearch: false, search: "" }),
}));

export const useShopStore = create((set, get) => ({
  // Products data
  allProducts: [],
  displayProducts: [],
  productsTotal: 0,
  isLoading: true,

  // Filter state
  filterProducts: {
    categories: [],
    subCategories: [],
  },

  // Categories data
  categories: [],
  subCategories: [],

  // Filters state
  showFilters: true,
  showTypeFilters: true,
  mobileFiltersOpen: false,
  activeFilterTab: "categories",

  // Sorting
  sortType: "Relevant",

  // Pagination
  activePage: 1,
  productPerPage: 8,
  //////////////////////////////////////////////////////////////////////////////////////////
  // Setters

  // Setters Product
  setAllProducts: (products) => set({ allProducts: products }),
  setDisplayProducts: (products) => set({ displayProducts: products }),
  setProductsTotal: (total) => set({ productsTotal: total }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Setters Categories
  setCategories: (categories) => set({ categories }),
  setSubCategories: (subCategories) => set({ subCategories }),

  // Setters Filters
  setShowFilters: (show) => set({ showFilters: show }),
  setShowTypeFilters: (show) => set({ showTypeFilters: show }),
  setMobileFiltersOpen: (open) => set({ mobileFiltersOpen: open }),
  setActiveFilterTab: (tab) => set({ activeFilterTab: tab }),
  // & Toggles & Actions
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),
  toggleTypeFilters: () =>
    set((state) => ({ showTypeFilters: !state.showTypeFilters })),
  toggleMobileFilters: () =>
    set((state) => ({ mobileFiltersOpen: !state.mobileFiltersOpen })),

  handleFilters: (documentId, type) => {
    set((state) => {
      const field = type === "category" ? "categories" : "subCategories";
      const current = state.filterProducts[field];
      const updated = current.includes(documentId)
        ? current.filter((i) => i !== documentId)
        : [...current, documentId];

      return {
        filterProducts: {
          ...state.filterProducts,
          [field]: updated,
        },
      };
    });
  },

  clearFilters: () =>
    set({
      filterProducts: { categories: [], subCategories: [] },
      activePage: 1,
    }),

  // Setters Sorting
  setSortType: (sortType) => set({ sortType }),

  // Setter Pagination & Actions
  setActivePage: (page) => set({ activePage: page }),
  setProductPerPage: (perPage) => set({ productPerPage: perPage }),
  handlePageChange: (page) => {
    const totalPages = Math.ceil(get().productsTotal / get().productPerPage);
    if (page >= 1 && page <= totalPages) {
      set({ activePage: page });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////

  // GET data
  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      const [categories, subCategories, productsResponse] = await Promise.all([
        ShopRepo.categories_index(),
        ShopRepo.subCategories_index(),
        ShopRepo.index_productItems(1, 100, {}),
      ]);

      set({
        categories: categories || [],
        subCategories: subCategories || [],
        allProducts: productsResponse?.data || [],
        displayProducts: productsResponse?.data || [],
        productsTotal:
          productsResponse?.total || productsResponse?.data?.length || 0,
      });
    } catch (error) {
      console.error("Error loading shop data:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Apply filters and sorting
  applyFiltersAndSort: () => {
    const { allProducts, filterProducts, sortType } = get();
    const { search, showSearch } = useSearchStore.getState();

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
        filterProducts.categories.includes(p.category.documentId)
      );
    }

    // Apply subcategory filters
    if (filterProducts.subCategories.length > 0) {
      filtered = filtered.filter((p) =>
        filterProducts.subCategories.includes(p.sub_category.documentId)
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

    set({
      displayProducts: filtered,
      productsTotal: filtered.length,
      activePage: get().activePage !== 1 ? 1 : get().activePage,
    });
  },
}));
