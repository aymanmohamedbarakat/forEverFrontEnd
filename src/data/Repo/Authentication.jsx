// import { userLogin } from "../apis/Auth_Index/login_user";
// import { userRegister } from "../apis/Auth_Index/register_user";
// import { userToken } from "../apis/Auth_Index/token_user";
// import { updateProfile } from "../apis/Auth_Index/update_profile";

// export const AuthRepo = {
//   register: async (values) => {
//     return userRegister(values);
//   },

//   login: async (values) => {
//     return userLogin(values);
//   },

//   validateToken: async (token) => {
//     return userToken(token);
//   },

//   updateProfile: async (userId, values, token) => {
//     return updateProfile(userId, values, token);
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     return true;
//   },
// };

import { userLogin } from "../apis/Auth_Index/login_user";
import { userRegister } from "../apis/Auth_Index/register_user";
import { userToken } from "../apis/Auth_Index/token_user";
import { updateUserProfile } from "../apis/Auth_Index/update_profile";

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

  updateProfile: async (userId, values, currentUser, token) => {
    return updateUserProfile(userId, values, currentUser, token);
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  },
};
