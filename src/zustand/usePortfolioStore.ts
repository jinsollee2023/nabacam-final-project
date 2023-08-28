import { create } from "zustand";

export type PortfolioStore = {
  selectedTitle: string;
  selectedDesc: string;
  selectedLink: string;
  selectedThumbnailFile: File | null;
  selectedPDFFile: File | null;
  pfId: string;
  thumbnailFileName: string;
  PDFFileName: string;

  setSelectedTitle: (title: string) => void;
  setSelectedDesc: (desc: string) => void;
  setSelectedLink: (link: string) => void;
  setSelectedThumbnailFile: (file: File | null) => void;
  setSelectedPDFFile: (file: File | null) => void;
  setPfId: (pfId: string) => void;
  setThumbnailFileName: (thumbnailFileName: string) => void;
  setPDFFileName: (PDFFileName: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  selectedTitle: "",
  selectedDesc: "",
  selectedLink: "",
  selectedThumbnailFile: null,
  selectedPDFFile: null,
  pfId: "",
  thumbnailFileName: "",
  PDFFileName: "",

  setSelectedTitle: (title) => set({ selectedTitle: title }),
  setSelectedDesc: (desc) => set({ selectedDesc: desc }),
  setSelectedLink: (link) => set({ selectedLink: link }),
  setSelectedThumbnailFile: (file) => set({ selectedThumbnailFile: file }),
  setSelectedPDFFile: (file) => set({ selectedPDFFile: file }), // TS 타입 어노테이션 (selectedFile의 타입이 file의 타입과 동일하다는 뜻)
  setPfId: (pfId) => set({ pfId }),
  setThumbnailFileName: (thumbnailFileName) => set({ thumbnailFileName }),
  setPDFFileName: (PDFFileName) => set({ PDFFileName }),
}));
