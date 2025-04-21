import { userLogin } from "../apis/login_user";
import { userRegister } from "../apis/register_user";
import { userToken } from "../apis/token_user";

export const AuthRepo = {
  register: async (values) => {
    return userRegister(values);
  },

  login: async (values) => {
    return userLogin(values);
  },

  validateToken: async (token) => {
    return userToken(token);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  },
};
