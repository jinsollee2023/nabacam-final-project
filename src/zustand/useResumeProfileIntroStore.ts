import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "resumeProfileIntro-storage-key";

type ResumeProfileIntroStore = {
  newProfileIntroInput: string;
  changeNewProfileIntroInput: (newProfileIntroInput: string) => void;
};

export const useResumeProfileIntroStore = create(
  persist<ResumeProfileIntroStore>(
    (set) => ({
      newProfileIntroInput: "",
      changeNewProfileIntroInput: (newProfileIntroInput) =>
        set(() => ({ newProfileIntroInput: newProfileIntroInput })),
    }),
    {
      name: StorageKey,
    }
  )
);
