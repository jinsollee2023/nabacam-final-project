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
        pastWorkEndDate: new Date(),
        pastWorkStartDate: new Date(),
      },
      pastWorkPlace: "",
      pastWorkPosition: "",
    },
    changeNewExperience: (newExperience) =>
      set(() => ({ newExperience: newExperience })),
  })
);
