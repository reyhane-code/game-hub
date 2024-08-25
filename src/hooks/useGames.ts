import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useGameQueryStore from "../games.store";
import { IPaginationQuery } from "../interfaces";
import { IGetGamesResponse } from "../responses/get-games.respone";


const fetchGames = async (
  gameQuery: IPaginationQuery,
  page: number,
  perPage: number
) => {
  const params = {
    page: page,
    perPage: perPage,
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

export const useGames = (page: number, perPage: number) => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useQuery<IGetGamesResponse, Error>(["games", gameQuery, page], () =>
    fetchGames(gameQuery, page, perPage)
  );
};
