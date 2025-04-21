import axios from "axios";
import { domain } from "../../store";
import { toast } from "react-toastify";

export const userToken = async (token) => {
  let userInfo;
  await axios
    .get(`${domain}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      userInfo = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Token validation error:", err);
      localStorage.clear();
      sessionStorage.clear();
      toast.info("Session expired, please login again");
    });
  return userInfo;
};
