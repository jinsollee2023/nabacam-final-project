import { create } from "zustand";

type ResumeProfileIntroStore = {
  newProfileIntroInput: string;
  changeNewProfileIntroInput: (newProfileIntroInput: string) => void;
};

export const useResumeProfileIntroStore = create<ResumeProfileIntroStore>(
  (set) => ({
    newProfileIntroInput: "",
    changeNewProfileIntroInput: (newProfileIntroInput) =>
      set(() => ({ newProfileIntroInput: newProfileIntroInput })),
  })
);
