import { Project } from "src/Types";
import { create } from "zustand";

type ProjectStore = {
  newProject: Project;
  changeNewProject: (newProject: Project) => void;
};

export const useProjectStore = create<ProjectStore>()((set) => ({
  newProject: {
    title: "",
    desc: "",
    clientId: "",
    deadLine: new Date(),
    pay: {
      min: 0,
      max: 0,
    },
    status: "",
  },
  changeNewProject: (newProject) => set(() => ({ newProject: newProject })),
}));

type SelectProjectStore = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
};

export const useSelectProjectStore = create<SelectProjectStore>()((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set(() => ({ selectedProject: project })),
}));
