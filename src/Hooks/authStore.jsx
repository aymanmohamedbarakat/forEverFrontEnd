import { create } from "zustand";
import { AuthRepo } from "../data/Repo/Authentication";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
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
          isAuthenticated: true,
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
          isAuthenticated: true,
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

  updateProfile: (updatedData) => {
    const { currentUser } = get();

    if (!currentUser) {
      toast.error("You must be logged in to update your profile");
      return false;
    }

    try {
      // Save updated user data to localStorage
      const updatedUser = { ...currentUser, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update application state
      set({ currentUser: updatedUser });

      return true;
    } catch (error) {
      toast.error("Failed to update profile in local storage");
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
