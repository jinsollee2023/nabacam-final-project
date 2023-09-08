import { create } from "zustand";

// 포트폴리오 추가, 수정 시 유효성 검사를 위해 임시로 만들어놓은 파일..
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
