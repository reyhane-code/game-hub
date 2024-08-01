import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import User from "../entities/User";
import useAuthStore from "../auth.store";

const useUser = () => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);
  const setIdentity = useAuthStore((s) => s.setIdentity);
  return useQuery<User, Error>(["user"], async () => {
    try {
      const response = await HttpRequest.get<User>("/v1/user/identity", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIdentity(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch game data");
    }
  });
};

//http request to get user data
export default useUser;
