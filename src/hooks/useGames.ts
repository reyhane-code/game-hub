import { HttpRequest } from "../helpers/http-request-class.helper";
import useGameQueryStore from "../store";

export interface GamesData {
  count: number;
  data: GamesResponse[];
  page: number;
  perPage: number;
  offset: number;
}

interface GamesResponse {
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
}

// export const useGames = () => {
//   const gameQuery = useGameQueryStore((s) => s.gameQuery);

//   return useQuery<GamesData, Error>({
//     //@ts-ignore
//     queryKey: ["games", gameQuery],
//     queryFn: () =>
//       HttpRequest.get("/games/all", {
//         params: {
//           genreId: gameQuery.genreId,
//           parentId: gameQuery.platformId,
//           order: gameQuery.sortOrder,
//           search: gameQuery.searchText,
//           page: 1,
//           perPage: 10,
//         },
//       }).then((res) => res.data),
//   });
// };

export const fetchGames = async () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  try {
    const res = await HttpRequest.get("/games/all", {
      params: {
        page: gameQuery.page,
        perPage: gameQuery.perPage,
        genreId: gameQuery.genreId,
        platformId: gameQuery.platformId,
        search: gameQuery.searchText,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
