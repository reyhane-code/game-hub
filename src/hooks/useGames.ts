import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useGameQueryStore from "../games.store";
import { IPaginationQuery } from "../interfaces";

export interface GamesData {
  count: number;
  data: GamesResponse[];
  page: number;
  perPage: number;
  offset: number;
}

export interface GamesResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  background_image: string;
  metacritic: number;
  rating_top: number;
  platforms: [
    {
      id: number;
      name: string;
      slug: string;
      createdAt: Date;
      updatedAt: Date;
      PlatformGame: {
        game_id: number;
        platform_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
  genres: [
    {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      GenreGame: {
        game_id: number;
        genre_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
  publishers: [
    {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      PublisherGame: {
        game_id: number;
        publisher_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
}
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
    const res = await HttpRequest.get<GamesData>("/v1/games", {
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

  return useQuery<GamesData, Error>(["games", gameQuery, page], () =>
    fetchGames(gameQuery, page, perPage)
  );
};
