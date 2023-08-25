import { create } from "zustand";

export type PortfolioStore = {
  portfolioFileSrc: string;
  selectedThumbnailFile: File | null;
  selectedPDFFile: File | null;

  setUserportfolioFileSrc: (portfolioFileSrc: string) => void;
  setSelectedThumbnailFile: (file: File | null) => void;
  setSelectedPDFFile: (file: File | null) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioFileSrc: "",
  selectedThumbnailFile: null,
  selectedPDFFile: null,

  setUserportfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
  setSelectedThumbnailFile: (file) => set({ selectedThumbnailFile: file }),
  setSelectedPDFFile: (file) => set({ selectedPDFFile: file }), // TS 타입 어노테이션 (selectedFile의 타입이 file의 타입과 동일하다는 뜻)
}));
