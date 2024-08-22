import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../auth.store";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { UserBookmarks } from "../entities/Bookmark";

interface BookmarksData {
  data: UserBookmarks[];
  count: number;
}

const useUserBookmarks = (entityType: string) => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);

  // Return the result of useQuery
  return useQuery<BookmarksData, Error>(
    ["bookmarks/user", entityType],
    async () => {
      try {
        const response = await HttpRequest.get<BookmarksData>(
          `/v1/bookmarks/user/${entityType}`,
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
    }
  );
};

export default useUserBookmarks;
