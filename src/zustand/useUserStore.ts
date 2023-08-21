import { create } from "zustand";

export type UserStore = {
  email: string;
  userId: string; // db의 userId
  setUserEmail: (email: string) => void;
  setUserId: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  userId: "",
  setUserEmail: (email) => set({ email }),
  setUserId: (userId) => set({ userId }),
}));
