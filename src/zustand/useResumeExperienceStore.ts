import { ResumeExperience } from "src/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const experienceStorageKey = "resumeExperience-storage-key";

type ResumeExperienceStore = {
  newExperience: ResumeExperience;
  changeNewExperience: (newExperience: ResumeExperience) => void;
};

export const useResumeExperienceStore = create(
  persist<ResumeExperienceStore>(
    (set) => ({
      newExperience: {
        experienceId: "",
        pastWorkField: "",
        pastEmploymentType: "",
        pastWorkDuration: {
          pastWorkEndDate: new Date(),
          pastWorkStartDate: new Date(),
        },
        pastWorkPlace: "",
        pastWorkPosition: "",
      },
      changeNewExperience: (newExperience) =>
        set(() => ({ newExperience: newExperience })),
    }),
    {
      name: experienceStorageKey,
    }
  )
);
