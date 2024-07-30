import { HttpRequest } from "../helpers/http-request-class.helper";

const useUserLikes = () => {
  const tokens = HttpRequest.getTokens;
  try {
    return HttpRequest.get("/v1/likes/user", {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    }).then((res) => res.data);
  } catch (error) {
    console.log("error ocurred", error);
  }
};

export default useUserLikes;
