import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery, ISearchFilterOptions } from "../interfaces";
import { IGetGamesResponse } from "../responses/get-games.response";
import { useGameQueryStore } from "../store";
import { FilterOperationEnum } from "../enums";


const fetchGames = async (
  gameQuery: IPaginationQuery,
  page: number,
  perPage: number,
  search?: string
) => {
  const searchParam: ISearchFilterOptions[] =
    (search && search.length > 1)
      ? [{
        field: "name",
        operation: FilterOperationEnum.ILIKE,
        value: `%${search}%`
      }]
      : gameQuery.search!;
  const params = {
    filter: gameQuery.filter,
    search: searchParam,
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

export const useGames = (page: number, perPage: number = 10, search?: string) => {
  const { query: gameQuery } = useGameQueryStore();

  return useQuery<IGetGamesResponse, Error>(["games", gameQuery, page, search], () =>
    fetchGames(gameQuery, page, perPage, search)
  );
};