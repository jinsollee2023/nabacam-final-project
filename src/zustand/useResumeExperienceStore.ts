import { ResumeExperience } from "src/Types";
import { create } from "zustand";

type ResumeExperienceStore = {
  newPastExperience: ResumeExperience;
  changeNewPastExperience: (newExperience: ResumeExperience) => void;
};

export const useResumeExperienceStore = create<ResumeExperienceStore>(
  (set) => ({
    newPastExperience: {
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
    changeNewPastExperience: (newExperience) =>
      set(() => ({ newPastExperience: newExperience })),
  })
);
