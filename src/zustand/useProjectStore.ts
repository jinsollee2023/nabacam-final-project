import { Project } from "src/Types";
import { create } from "zustand";

type ProjectStore = {
  newProject: Project;
  changeNewProject: (newProject: Project) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
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
    category: "",
    manager: {
      name: "",
      team: "",
      contact: {
        email: "",
        phone: "",
      },
    },
    qualification: 0,
  },
  changeNewProject: (newProject) => set(() => ({ newProject: newProject })),
  selectedProject: null,
  setSelectedProject: (project) => set(() => ({ selectedProject: project })),
  // updateProjectVolunteers :
}));
