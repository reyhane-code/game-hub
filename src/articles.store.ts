import { create } from "zustand";

export interface GetArticlesQuery {
  sortOrder?: string;
  searchText?: string;
}

interface ArticleQueryStore {
  articleQuery: GetArticlesQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useArticleQueryStore = create<ArticleQueryStore>((set) => ({
  articleQuery: {},
  setSearchText: (searchText) => set(() => ({ articleQuery: { searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({
      articleQuery: { ...store.articleQuery, sortOrder },
    })),
}));

export default useArticleQueryStore;
