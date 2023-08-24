import { create } from "zustand";

export type UserStore = {
  userId: string;
  email: string; //삭
  freelancerRole: string;
  name: string;
  photoURL: string;
  projectId: string;

  setUserId: (id: string) => void; //로그인 -> 회원가입
  setFreelancerRole: (role: string) => void; //회원가입
  setUserName: (name: string) => void; //마이페이지 -> 회원가입 ?
  setUserPhotoURL: (photoURL: string) => void; //형식상 넣어주고 안씀
  setUserEmail: (email: string) => void; //삭
  setProjectId: (projectId: string) => void; //마이페이지
};

export const useUserStore = create<UserStore>((set) => ({
  userId: "",
  email: "", //삭
  freelancerRole: "freelancer",
  name: "",
  photoURL: "",
  projectId: "",

  setUserId: (userId) => set({ userId }),
  setUserEmail: (email) => set({ email }), //삭
  setFreelancerRole: (freelancerRole) => set({ freelancerRole }),
  setUserName: (name) => set({ name }),
  setUserPhotoURL: (photoURL) => set({ photoURL }),
  setProjectId: (projectId) => set({ projectId }),
}));
