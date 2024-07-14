import { HttpRequest } from "./http-request-class.helper";

export const checkAuthentication = () => {
  return HttpRequest.getTokens ? true : false;
};
