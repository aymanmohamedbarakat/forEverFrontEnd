
import { indexCategories } from "../apis/index_categories";
import { indexProductDetails } from "../apis/index_productDetails";
import { indexProductItems } from "../apis/index_productItems";
import { indexSubCategories } from "../apis/index_subcategories";

export const ShopRepo = {
  categories_index: async () => {
    return await indexCategories();
  },

  subCategories_index: async () => {
    return await indexSubCategories();
  },

  index_productItems: async (pageNo, pageSize, filtersId) => {
    return await indexProductItems(pageNo, pageSize, filtersId);
  },

  index_productDetails: async (id) =>{
    return await indexProductDetails(id);
  }
};
