import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../src/lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message, {
                style: { background: "#333", color: "#fff" },
            });
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async () => {
        try {
            set({ isMessageLoading: true });
        } catch (error) {
            const res = await axiosInstance.get(`messages/${userId}`);
            set({ messages: res.data });
        } finally {
            set({ isMessageLoading: false });
        }
    },

    setSelectedUser: async (data) => {
        set({ selectedUser: data });
    },
}));
