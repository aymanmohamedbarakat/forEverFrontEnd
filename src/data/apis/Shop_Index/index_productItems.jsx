/////////////////////////////////////////////////
//documentId
import axios from "axios";
import { domain } from "../../../store";

export const indexProductItems = async (
  pageNo = 1,
  pageSize = 55,
  filters = {}
) => {
  try {
    const res = await axios.get(domain + "/api/products", {
      params: {
        populate: "*",
        pagination: {
          page: pageNo,
          pageSize: pageSize,
        },
        filters: {
          ...(filters.categories?.length > 0 && {
            category: {
              documentId: {
                $in: filters.categories,
              },
            },
          }),
          ...(filters.subCategories?.length > 0 && {
            sub_category: {
              documentId: {
                $in: filters.subCategories,
              },
            },
          }),
        },
        sort: [ "price"],  //"name",
      },
    });
    return {
      total: res.data.meta.pagination.total,
      data: res.data.data,
    };
  } catch (error) {
    console.error("Error fetching products", error);
    return { total: 0, data: [] };
  }
};
/////////////////////////////////////////////


