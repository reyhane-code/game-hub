import { HttpRequest } from "../helpers/http-request-class.helper";

const useUserLikes = () => {
  const tokens = HttpRequest.getTokens;
  return HttpRequest.get("/likes/user", {
    headers: {
      Authorization: tokens?.accessToken,
    },
  }).then((res) => res.data);
};

export default useUserLikes;
