import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error is check Auth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully", {
                style: { background: "#333", color: "#fff" },
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                style: { background: "#333", color: "#fff" },
            });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully", {
                style: { background: "#333", color: "#fff" },
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                style: { background: "#333", color: "#fff" },
            });
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully", {
                style: { background: "#333", color: "#fff" },
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                style: { background: "#333", color: "#fff" },
            });
        }
    },
}));
