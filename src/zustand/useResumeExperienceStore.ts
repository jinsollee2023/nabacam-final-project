import { ResumeExperience } from "../Types";
import { create } from "zustand";

type ResumeExperienceStore = {
  newExperience: ResumeExperience;
  changeNewExperience: (newExperience: ResumeExperience) => void;
};

export const useResumeExperienceStore = create<ResumeExperienceStore>(
  (set) => ({
    newExperience: {
      experienceId: "",
      pastWorkField: "",
      pastEmploymentType: "",
      pastWorkDuration: {
        pastWorkEndDate: "",
        pastWorkStartDate: "",
      },
      pastWorkPlace: "",
      pastWorkPosition: "",
    },
    changeNewExperience: (newExperience) =>
      set(() => ({ newExperience: newExperience })),
  })
);
