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

type ProjectValuesStore = {
  values: Values;
  changeValues: (values: Values) => void;
};

export const useProjectValuesStore = create<ProjectValuesStore>()((set) => ({
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
