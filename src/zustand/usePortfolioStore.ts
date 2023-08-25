import { create } from "zustand";

export type PortfolioStore = {
  portfolioFileSrc: string;
  selectedThumbnailFile: File | null;
  selectedPDFFile: File | null;
  pfId: string;

  setUserportfolioFileSrc: (portfolioFileSrc: string) => void;
  setSelectedThumbnailFile: (file: File | null) => void;
  setSelectedPDFFile: (file: File | null) => void;
  setPfId: (pfId: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioFileSrc: "",
  selectedThumbnailFile: null,
  selectedPDFFile: null,
  pfId: "",

  setUserportfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
  setSelectedThumbnailFile: (file) => set({ selectedThumbnailFile: file }),
  setSelectedPDFFile: (file) => set({ selectedPDFFile: file }), // TS 타입 어노테이션 (selectedFile의 타입이 file의 타입과 동일하다는 뜻)
  setPfId: (pfId) => set({ pfId }),
}));

// export type PortfolioStore = {
//   portfolioFileSrc: string;
//   selectedThumbnailFile?: File;  // 초기화하지 않음
//   selectedPDFFile?: File;

//   setUserportfolioFileSrc: (portfolioFileSrc: string) => void;
//   setSelectedThumbnailFile: (file: File) => void; // 필요한 시점에 값을 할당 (: File | undefined)
//   setSelectedPDFFile: (file: File) => void;
// };

// export const usePortfolioStore = create<PortfolioStore>((set) => ({
//   portfolioFileSrc: "",
//   setUserportfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
//   setSelectedThumbnailFile: (file) => set({ selectedThumbnailFile: file }),
//   setSelectedPDFFile: (file) => set({ selectedPDFFile: file }),
// }));
