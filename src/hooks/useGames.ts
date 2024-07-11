import { useQuery } from "@tanstack/react-query";
import useGameQueryStore, { GameQuery } from "../store";
import Game from "../entities/Game";
import { HttpRequest } from "../helpers/http-request-class.helper";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  return useQuery<FetchResponse<Game>,Error>({
    //@ts-ignore
    queryKey: [["games"], gameQuery],
    queryFn: () =>
      HttpRequest.get("/games/all", {
        params: {
          genreId: gameQuery.genreId,
          parentId: gameQuery.platformId,
          order: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: 1,
          perPage: 10,
        },
      }).then((res) => res.data),
  });
};

export default useGames;
