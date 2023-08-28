import { User } from "src/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "storage-key";

export type UserStore = {
  user: User;
  userId: string;
  email: string; //삭
  userRole: string;
  name: string;
  photoURL: string;
  projectId: string;

  setUser: (user: User) => void;
  setUserId: (id: string) => void; //로그인 -> 회원가입
  setUserRole: (role: string) => void; //회원가입
  setUserName: (name: string) => void; //마이페이지 -> 회원가입 ?
  setUserPhotoURL: (photoURL: string) => void; //형식상 넣어주고 안씀
  setUserEmail: (email: string) => void; //삭
  setProjectId: (projectId: string) => void; //마이페이지
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: {
        userId: "",
        role: "",
        name: "",
        photoURL: "",
        contact: { email: "", phone: "" },
        singUpDate: new Date(),
        portfolioCount: 0,
      },
      userId: "",
      email: "", //삭
      userRole: "",
      name: "",
      photoURL: "",
      projectId: "",

      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
      setUserEmail: (email) => set({ email }), //삭
      setUserRole: (userRole) => set({ userRole }),
      setUserName: (name) => set({ name }),
      setUserPhotoURL: (photoURL) => set({ photoURL }),
      setProjectId: (projectId) => set({ projectId }),
    }),
    {
      name: StorageKey,
    }
  )
);
