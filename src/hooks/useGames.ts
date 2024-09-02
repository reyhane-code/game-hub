import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery } from "../interfaces";
import { IGetGamesResponse } from "../responses/get-games.response";
import { useGameQueryStore } from "../store";


const fetchGames = async (
  gameQuery: IPaginationQuery,
  page: number,
  perPage: number
) => {
  const params = {
    filter: gameQuery.filter,
    search: gameQuery.search,
    sortBy: gameQuery.sortBy,
    page, perPage
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

export const useGames = (page: number, perPage: number = 10) => {
  const { query: gameQuery } = useGameQueryStore();

  return useQuery<IGetGamesResponse, Error>(["games", gameQuery, page], () =>
    fetchGames(gameQuery, page, perPage)
  );
};