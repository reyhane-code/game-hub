import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { GamesResponse } from "./useGames";

const useGame = (slug: string) =>
  useQuery<GamesResponse, Error>({
    queryKey: ["slug", slug],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<GamesResponse>(`/games/${slug}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch game data");
      }
    },
  });

export default useGame;
