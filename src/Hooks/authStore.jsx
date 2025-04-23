// import { create } from "zustand";
// import { AuthRepo } from "../data/Repo/Authentication";
// import { toast } from "react-toastify";

// export const useAuthStore = create((set) => ({
//   currentUser: JSON.parse(localStorage.getItem("user")) || null,
//   isAuthenticated: !!localStorage.getItem("token"),

//   login: async (email, password) => {
//     const res = await AuthRepo.login({ email, password });
//     if (res?.jwt) {
//       localStorage.setItem("token", res.jwt);
//       localStorage.setItem("user", JSON.stringify(res.user));
//       set({ currentUser: res.user, isAuthenticated: true });
//       toast.success(`Welcome back, ${res.user.username}`, { autoClose: 1200 });
//       return res;
//     } else {
//       toast.error("Invalid credentials", { autoClose: 1200 });
//       return false;
//     }
//   },

//   register: async ({ username, email, password, phone }) => {
//     const res = await AuthRepo.register({ username, email, password, phone });
//     if (res?.jwt) {
//       localStorage.setItem("token", res.jwt);
//       localStorage.setItem("user", JSON.stringify(res.user));
//       set({ currentUser: res.user, isAuthenticated: true });
//       toast.success("Registration successful!", { autoClose: 1200 });
//       return res;
//     } else {
//       toast.error("Registration failed", { autoClose: 1200 });
//       return false;
//     }
//   },

//   logout: () => {
//     AuthRepo.logout();
//     set({ currentUser: null, isAuthenticated: false });
//     toast.info("You have been logged out", { autoClose: 1200 });
//   },

//   validateToken: async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const user = await AuthRepo.validateToken(token);
//       if (user) {
//         set({ currentUser: user, isAuthenticated: true });
//         localStorage.setItem("user", JSON.stringify(user));
//         return true;
//       } else {
//         AuthRepo.logout();
//         set({ currentUser: null, isAuthenticated: false });
//         return false;
//       }
//     }
//     return false;
//   },
// }));
////////////
// import { create } from "zustand";
// import { AuthRepo } from "../data/Repo/Authentication";
// import { toast } from "react-toastify";

// export const useAuthStore = create((set) => ({
//   currentUser: JSON.parse(localStorage.getItem("user")) || null,
//   isAuthenticated: !!localStorage.getItem("token"),

//   login: async (email, password) => {
//     try {
//       const res = await AuthRepo.login({ email, password });
//       if (res?.jwt) {
//         localStorage.setItem("token", res.jwt);
//         localStorage.setItem("user", JSON.stringify(res.user));
//         set({ currentUser: res.user, isAuthenticated: true });
//         toast.success(`Welcome back, ${res.user.username}`, {
//           autoClose: 1200,
//         });
//         return res;
//       } else {
//         toast.error("Invalid credentials", { autoClose: 1200 });
//         return false;
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred during login", {
//         autoClose: 1200,
//       });
//       return false;
//     }
//   },

//   register: async (values) => {
//     try {
//       const res = await AuthRepo.register(values);
//       if (res?.jwt) {
//         localStorage.setItem("token", res.jwt);
//         localStorage.setItem("user", JSON.stringify(res.user));
//         set({ currentUser: res.user, isAuthenticated: true });
//         toast.success(`Welcome, ${res.user.username}!`, { autoClose: 1200 });
//         return res;
//       } else {
//         toast.error("Registration failed", { autoClose: 1200 });
//         return false;
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred during registration", {
//         autoClose: 1200,
//       });
//       return false;
//     }
//   },

//   logout: () => {
//     AuthRepo.logout();
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     set({ currentUser: null, isAuthenticated: false });
//     toast.info("You have been logged out", { autoClose: 1200 });
//   },

//   validateToken: async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const user = await AuthRepo.validateToken(token);
//         if (user) {
//           set({ currentUser: user, isAuthenticated: true });
//           localStorage.setItem("user", JSON.stringify(user));
//           return true;
//         } else {
//           // If validateToken returns null, clear storage and set as unauthenticated
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           set({ currentUser: null, isAuthenticated: false });
//           return false;
//         }
//       } catch (error) {
//         // Handle any errors from validateToken
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         set({ currentUser: null, isAuthenticated: false });
//         return false;
//       }
//     }
//     return false;
//   },
// }));
////////////////////////

import { create } from "zustand";
import { AuthRepo } from "../data/Repo/Authentication";
import { toast } from "react-toastify";
export const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  authToken: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const res = await AuthRepo.login({ email, password });
      if (res?.jwt) {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("user", JSON.stringify(res.user));
        set({ 
          currentUser: res.user, 
          authToken: res.jwt, 
          isAuthenticated: true 
        });
        toast.success(`Welcome back, ${res.user.username}`, {
          autoClose: 1200,
        });
        return res;
      } else {
        toast.error("Invalid credentials", { autoClose: 1200 });
        return false;
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during login", {
        autoClose: 1200,
      });
      return false;
    }
  },

  register: async (values) => {
    try {
      const res = await AuthRepo.register(values);
      if (res?.jwt) {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("user", JSON.stringify(res.user));
        set({ 
          currentUser: res.user, 
          authToken: res.jwt, 
          isAuthenticated: true 
        });
        toast.success(`Welcome, ${res.user.username}!`, { autoClose: 1200 });
        return res;
      } else {
        toast.error("Registration failed", { autoClose: 1200 });
        return false;
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration", {
        autoClose: 1200,
      });
      return false;
    }
  },

  logout: () => {
    AuthRepo.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ currentUser: null, authToken: null, isAuthenticated: false });
    toast.info("You have been logged out", { autoClose: 1200 });
  },

  validateToken: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await AuthRepo.validateToken(token);
        if (user) {
          set({ currentUser: user, authToken: token, isAuthenticated: true });
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          set({ currentUser: null, authToken: null, isAuthenticated: false });
          return false;
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ currentUser: null, authToken: null, isAuthenticated: false });
        return false;
      }
    }
    return false;
  },
}));
