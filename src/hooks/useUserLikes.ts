import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../auth.store";
import Game from "../entities/Game";
import { HttpRequest } from "../helpers/http-request-class.helper";

interface LikesData {
  id: number;
  user_id: number;
  game_id: number;
  game: Game;
}

const useUserLikes = () => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);
  useQuery<LikesData[], Error>(["user/likes"], async () => {
    return HttpRequest.get<LikesData[]>("/v1/likes/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.data);
  });
};

export default useUserLikes;
