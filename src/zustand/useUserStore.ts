import { create } from "zustand";

export type UserStore = {
  userId: string;
  email: string;
  freelancerRole: string;
  name: string;
  photoURL: string;

  setUserId: (id: string) => void;
  setFreelancerRole: (role: string) => void;
  setUserName: (name: string) => void;
  setUserPhotoURL: (photoURL: string) => void;
  setUserEmail: (email: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userId: "",
  email: "",
  freelancerRole: "freelancer",
  name: "",
  photoURL: "",

  setUserId: (userId) => set({ userId }),
  setUserEmail: (email) => set({ email }),
  setFreelancerRole: (freelancerRole) => set({ freelancerRole }),
  setUserName: (name) => set({ name }),
  setUserPhotoURL: (photoURL) => set({ photoURL }),
}));
