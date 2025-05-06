import axios from "axios";
import { domain } from "../../../store";

export const indexSubCategories = async () => {
  let final = [];
  await axios.get(domain + "/api/sub-categories").then((res) => {
    final = res.data.data;
  });
  return final;
};