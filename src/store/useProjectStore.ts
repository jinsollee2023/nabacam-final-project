import { Project } from "../Types";
import { create } from "zustand";

export interface Values {
  title: string;
  desc: string;
  category: string | undefined;
  qualification: number | null;
  expectedStartDate: string;
  manager: {
    name: string;
    team: string;
    contact: { email: string; phone: string };
  };
  minPay: number | string;
  maxPay: number | string;
}

type ProjectStore = {
  newProject: Project;
  changeNewProject: (newProject: Project) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  values: Values;
  changeValues: (values: Values) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  newProject: {
    title: "",
    desc: "",
    clientId: "",
    expectedStartDate: "",
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
  values: {
    title: "",
    desc: "",
    category: "",
    qualification: null,
    expectedStartDate: "",
    manager: { name: "", team: "", contact: { email: "", phone: "" } },
    minPay: "",
    maxPay: "",
  },
  changeValues: (values) => set(() => ({ values })),
}));
