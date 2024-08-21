import { create } from "zustand";
import { IPaginationQuery, ISearchFilterOptions } from "./interfaces";

interface ArticleQueryStore {
  articleQuery: IPaginationQuery;
  setSearch: (search: ISearchFilterOptions) => void;
  setFilter: (filter: ISearchFilterOptions) => void;
  setSortBy: (sortOrder: string) => void;
}

const useArticleQueryStore = create<ArticleQueryStore>((set) => ({
  articleQuery: {},
  setSearch: (search: ISearchFilterOptions) =>
    set((store) => {
      const newSearchArray = store.articleQuery.search?.push(search);
      return { articleQuery: { ...store.articleQuery, newSearchArray } };
    }),

  setFilter: (filter: ISearchFilterOptions) =>
    set((store) => {
      const newFilterArray = store.articleQuery.filter?.push(filter);
      return { articleQuery: { ...store.articleQuery, newFilterArray } };
    }),
  setSortBy: (sortBy:string) =>
    set((store) => ({
      articleQuery: { ...store.articleQuery, sortBy },
    })),
}));

export default useArticleQueryStore;
