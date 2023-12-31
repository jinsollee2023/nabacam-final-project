import { User } from "../Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "storage-key";

export type UserStore = {
  user: User;
  userId: string;
  userRole: string;

  setUser: (user: User) => void;
  setUserId: (id: string) => void; //로그인 -> 회원가입
  setUserRole: (role: string) => void; //회원가입
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: {
        userId: "",
        role: "client",
        name: "",
        photoURL: "",
        contact: { email: "", phone: "" },
        signUpDate: new Date(),
        portfolioCount: 0,
      },
      userId: "",
      userRole: "client",

      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
      setUserRole: (userRole) => set({ userRole }),
    }),
    {
      name: StorageKey,
    }
  )
);
