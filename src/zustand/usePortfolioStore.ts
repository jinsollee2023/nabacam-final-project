import { create } from "zustand";

export type PortfolioStore = {
  portfolioFileSrc: string;
  selectedTitle: string;
  selectedDesc: string;
  selectedThumbnailFile: File | null;
  selectedPDFFile: File | null;
  pfId: string;
  thumbnailFileName: string;

  setUserportfolioFileSrc: (portfolioFileSrc: string) => void;
  setSelectedTitle: (title: string) => void;
  setSelectedDesc: (desc: string) => void;
  setSelectedThumbnailFile: (file: File | null) => void;
  setSelectedPDFFile: (file: File | null) => void;
  setPfId: (pfId: string) => void;
  setThumbnailFileName: (thumbnailFileName: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioFileSrc: "",
  selectedTitle: "",
  selectedDesc: "",
  selectedThumbnailFile: null,
  selectedPDFFile: null,
  pfId: "",
  thumbnailFileName: "",

  setUserportfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
  setSelectedTitle: (title) => set({ selectedTitle: title }),
  setSelectedDesc: (desc) => set({ selectedDesc: desc }),
  setSelectedThumbnailFile: (file) => set({ selectedThumbnailFile: file }),
  setSelectedPDFFile: (file) => set({ selectedPDFFile: file }), // TS 타입 어노테이션 (selectedFile의 타입이 file의 타입과 동일하다는 뜻)
  setPfId: (pfId) => set({ pfId }),
  setThumbnailFileName: (thumbnailFileName) => set({ thumbnailFileName }),
}));
