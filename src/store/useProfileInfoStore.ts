import { create } from "zustand";

type ProfileInfoStore = {
  newProfileInfo: {
    name: string;
    workField: string;
    workSmallField: string;
    phone: string;
    photo: File | string;
  };
  changeNewProfileInfo: (newProfileInfo: {
    name: string;
    workField: string;
    workSmallField: string;
    phone: string;
    photo: File | string;
  }) => void;
};

export const useProfileInfoStore = create<ProfileInfoStore>((set) => ({
  newProfileInfo: {
    name: "",
    workField: "",
    workSmallField: "",
    phone: "",
    photo: "",
  },
  changeNewProfileInfo: (newProfileInfo) => set(() => ({ newProfileInfo })),
}));
