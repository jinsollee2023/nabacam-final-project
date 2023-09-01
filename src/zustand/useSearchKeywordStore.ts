import { create } from "zustand";

type SearchKeywordStore = {
  searchKeyword: string;
  changeSearchKeyword: (keyword: string) => void;
};

export const useSearchKeywordStore = create<SearchKeywordStore>()((set) => ({
  searchKeyword: "",
  changeSearchKeyword: (keyword) => set(() => ({ searchKeyword: keyword })),
}));
