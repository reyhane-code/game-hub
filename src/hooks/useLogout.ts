import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useAuthStore from "../auth.store";

const useLogut = () => {
  const { accessToken } = useAuthStore((s) => s.auth.tokens);
  useQuery(["logout"], () => {
    return HttpRequest.delete("/v1/auth/logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
};

export default useLogut;
