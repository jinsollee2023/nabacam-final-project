import { Portfolio } from "src/Types";
import { create } from "zustand";

export type PortfolioStore = {
  newPortfolio: Portfolio;
  selectedPortfolio: Portfolio | null;
  changeNewPortfolio: (newPortfolio: Portfolio) => void;
  setSelectedPortfolio: (portfolio: Portfolio | null) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  newPortfolio: {
    portfolioId: "",
    freelancerId: "",
    title: "",
    desc: "",
    linkURL: "",
    thumbNailURL: "",
    pdfFileURL: "",
  },
  selectedPortfolio: null,
  changeNewPortfolio: (newPortfolio) =>
    set(() => ({ newPortfolio: newPortfolio })),
  setSelectedPortfolio: (portfolio) => set({ selectedPortfolio: portfolio }),
}));
