import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../auth.store";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { UserLike } from "../entities/Like";

interface LikesData {
  data: UserLike[];
  count: number;
}

const useUserLikes = (entityType: string) => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);

  // Return the result of useQuery
  return useQuery<LikesData, Error>(["likes/user", entityType], async () => {
    try {
      const response = await HttpRequest.get<LikesData>(
        `/v1/likes/user/${entityType}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch bookmarks data");
    }
  });
};

export default useUserLikes;
