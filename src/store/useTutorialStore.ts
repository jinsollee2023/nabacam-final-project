import { create } from "zustand";

type TutorialStore = {
  tutorialModalOpen: boolean;
  changeTutorialModalOpen: (tutorialModalOpen: boolean) => void;
  tab: string;
  changeTab: (tab: string) => void;
};

export const useTutorialStore = create<TutorialStore>()((set) => ({
  tutorialModalOpen: true,
  changeTutorialModalOpen: (tutorialModalOpen) =>
    set(() => ({ tutorialModalOpen })),
  tab: "",
  changeTab: (tab) => set(() => ({ tab })),
}));
