import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthUser = create((set) => ({
  user: null,
  issigningup: false,
  isloginging: false,
  ischeckingauth: false,
  signup: async (credentials) => {
    set({ issigningup: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, issigningup: false });
      toast.success("account created successfully");
    } catch (error) {
      set({ issigningup: false, user: null });
      toast.error(error.response.data.error || "an error occured");
    }
  },
  login: async (credentials) => {
    set({ islogingingtrue: true });

    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isloginging: false });
      toast.success("user logged in succesfully");
    } catch (error) {
      set({ isloginging: false, user: null });
      toast.error(error.response.data.error || "an error occured");
    }
  },
  logout: async () => {
    try {
      const response = await axios.post("/api/v1/auth/logout");
      set({ user: null });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error || "an error occured");
    }
  },
  checkauth: async () => {
    set({ ischeckingauth: true });
    try {
      const response = await axios.get("/api/v1/auth/authuser");
      set({ user: response.data.user, ischeckingauth: false });
    } catch (error) {
      set({ user: null, ischeckingauth: false });
      console.log(error);
      //error
    }
  },
}));
