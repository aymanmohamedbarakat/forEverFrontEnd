import axios from "axios";
import { domain } from "../../../store";

export const indexProductDetails = async (id) => {
  let final = [];
  await axios.get(domain + `/api/products/${id}` , {
    params:  {
        populate : "*"
    }
  }).then((res) => {
    final = res.data.data;
    // console.log(final);
  });
  return final;
};