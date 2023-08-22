import { create } from "zustand";

export type PortfolioStore = {
  portfolioThumbnailSrc: string;

  setUserportfolioThumbnailSrc: (portfolioThumbnailSrc: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioThumbnailSrc: "",

  setUserportfolioThumbnailSrc: (portfolioThumbnailSrc) =>
    set({ portfolioThumbnailSrc }),
}));
