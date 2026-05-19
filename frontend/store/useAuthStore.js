import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios"; // Adjust path if your folder structure is slightly different
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// FIXED: Using import.meta.env.MODE for Vite to prevent production crashes
const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in check Auth", error);
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
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "An Error Occurred", {
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
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "An Error Occurred", {
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
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "An Error Occurred", {
                style: { background: "#333", color: "#fff" },
            });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully", {
                style: { background: "#333", color: "#fff" },
            });
        } catch (error) {
            console.log("Error in update profile", error);
            toast.error(error.response?.data?.message || "An Error Occurred", {
                style: { background: "#333", color: "#fff" },
            });
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        // Prevent connection if not logged in or if a socket is already actively connected
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });

        socket.connect();
        set({ socket: socket });

        // CRITICAL: Actively listen for backend broadcasts to update online users
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        // FIXED: Clear out the socket and onlineUsers array completely when a user logs out
        if (get().socket?.connected) {
            get().socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },
}));
