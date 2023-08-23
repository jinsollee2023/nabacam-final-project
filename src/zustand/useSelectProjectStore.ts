import { create } from "zustand";

type SelectProjectStore = {
  selectedProjectId: string | null;
  selectedProjectTitle: string | null;
  setSelectedProjectId: (id: string | null) => void;
  setSelectedProjectTitle: (title: string | null) => void;
};

export const useSelectProjectStore = create<SelectProjectStore>()((set) => ({
  selectedProjectId: null,
  selectedProjectTitle: null,
  setSelectedProjectId: (id) => set(() => ({ selectedProjectId: id })),
  setSelectedProjectTitle: (title) =>
    set(() => ({ selectedProjectTitle: title })),
}));
