import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../src/lib/axios";

export const useChatStore = create((set, get) => ({
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
            toast.error(error.response?.data?.message || "An Error Occurred", {
                style: { background: "#333", color: "#fff" },
            });
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.message });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch messages",
                {
                    style: { background: "#333", color: "#fff" },
                }
            );
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        if (!selectedUser?._id) {
            toast.error("No user selected to send message", {
                style: { background: "#333", color: "#fff" },
            });
            return;
        }

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("sendMessage error:", error);
            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to send message",
                { style: { background: "#333", color: "#fff" } }
            );
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },
}));
