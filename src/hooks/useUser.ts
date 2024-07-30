import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import User from "../entities/User";

const useUser = () => {
  const tokens = HttpRequest.getTokens;
  return useQuery<User, Error>(["user"], async () => {
    try {
      const response = await HttpRequest.get<User>("/v1/user/identity", {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch game data");
    }
  });
};

//http request to get user data
export default useUser;
