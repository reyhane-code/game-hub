import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";

export interface UserLiksData {

}

const useUserLikes = <T>(entityType: string) => {

  return useQuery<T, Error>(["likes/user", entityType], async () => {
    try {
      const response = await HttpRequest.get<T>(
        `/v1/likes/user/${entityType}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch likes data");
    }
  });
};

export default useUserLikes;
