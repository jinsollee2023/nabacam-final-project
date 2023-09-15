import { ResumeExperience } from "../Types";
import { create } from "zustand";

type ResumeStore = {
  newExperience: ResumeExperience;
  changeNewExperience: (newExperience: ResumeExperience) => void;
  newProfileIntroInput: string;
  changeNewProfileIntroInput: (newProfileIntroInput: string) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
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
  newProfileIntroInput: "",
  changeNewProfileIntroInput: (newProfileIntroInput) =>
    set(() => ({ newProfileIntroInput: newProfileIntroInput })),
}));
