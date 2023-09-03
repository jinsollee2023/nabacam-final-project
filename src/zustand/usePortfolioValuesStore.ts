import { create } from "zustand";

export interface Values {
  title: string;
  desc: string;
  thumbNailURL: string | File;
  pdfFileURL?: string | File;
  linkURL?: string;
}

type PortfolioValuesStore = {
  values: Values;
  changeValues: (values: Values) => void;
};

export const usePortfolioValuesStore = create<PortfolioValuesStore>()(
  (set) => ({
    values: {
      title: "",
      desc: "",
      thumbNailURL: "",
      pdfFileURL: "",
      linkURL: "",
    },
    changeValues: (values) => set(() => ({ values })),
  })
);
