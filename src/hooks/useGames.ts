import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery } from "../interfaces";
import { IGetGamesResponse } from "../responses/get-games.respone";
import { useGameQueryStore } from "../store";


const fetchGames = async (
  gameQuery: IPaginationQuery,
) => {
  const params = {
    page: gameQuery.page,
    perPage: gameQuery.perPage,
    filter: gameQuery.filter,
    search: gameQuery.search,
    sortBy: gameQuery.sortBy,
  };
  try {
    const res = await HttpRequest.get<IGetGamesResponse>("/v1/games", {
      params,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const useGames = () => {
  const { query: gameQuery } = useGameQueryStore();

  return useQuery<IGetGamesResponse, Error>(["games", gameQuery, gameQuery.page], () =>
    fetchGames(gameQuery)
  );
};
