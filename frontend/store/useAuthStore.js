import { create } from "zustand";
import { axoisInstance } from "../src/lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axoisInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error is check Auth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
