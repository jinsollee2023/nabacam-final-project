import { create } from "zustand";

// 기존
// export type PortfolioStore = {
//   portfolioThumbnailSrc: string;

//   setUserportfolioThumbnailSrc: (portfolioThumbnailSrc: string) => void;
// };

// export const usePortfolioStore = create<PortfolioStore>((set) => ({
//   portfolioThumbnailSrc: "",

//   setUserportfolioThumbnailSrc: (portfolioThumbnailSrc) =>
//     set({ portfolioThumbnailSrc }),
// }));

// 제네릭으로 수정 (실패)

// export type PortfolioStore<T> = {
//   portfolioFileSrc: T;

//   setPortfolioFileSrc: (portfolioFileSrc: T) => void;
// };

// export const usePortfolioStore = <T>() =>
//   create<PortfolioStore<T>>((set) => ({
//     portfolioFileSrc: "" as T,

//     setPortfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
//   }));

// 파일타입별로 분류전

export type PortfolioStore = {
  portfolioFileSrc: string;

  setUserportfolioFileSrc: (portfolioFileSrc: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioFileSrc: "",

  setUserportfolioFileSrc: (portfolioFileSrc) => set({ portfolioFileSrc }),
}));

// 파일타입별로 분류
// export const usePortfolioStore = create((set) => ({
//   portfolioFileSrc: {
//     thumbnail: "", // 초기값 설정
//     PDF: "", // 초기값 설정
//     link: "", // 초기값 설정
//   },

//   setUserportfolioFileSrc: (fileType, portfolioFileSrc) =>
//     set((state) => ({
//       portfolioFileSrc: {
//         ...state.portfolioFileSrc,
//         [fileType]: portfolioFileSrc, // 해당 fileType의 URL을 업데이트
//       },
//     })),
// }));
