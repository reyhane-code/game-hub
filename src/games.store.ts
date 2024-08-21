import { create } from "zustand";
import { IPaginationQuery, ISearchFilterOptions } from "./interfaces";

interface GameQueryStore {
  gameQuery: IPaginationQuery;
  setSearch: (search: ISearchFilterOptions) => void;
  setFilter: (filter: ISearchFilterOptions) => void;
  setSortBy: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setSearch: (search: ISearchFilterOptions) =>
    set((store) => {
      const newSearchArray = store.gameQuery.search?.push(search);
      return { gameQuery: { ...store.gameQuery, newSearchArray } };
    }),

  setFilter: (filter: ISearchFilterOptions) =>
    set((store) => {
      const newFilterArray = store.gameQuery.filter?.push(filter);
      return { gameQuery: { ...store.gameQuery, newFilterArray } };
    }),
  setSortBy: (sortBy) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, sortBy },
    })),
}));

export default useGameQueryStore;
