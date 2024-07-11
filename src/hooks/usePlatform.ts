import Platform from "../entities/Platform";
import { HttpRequest } from "../helpers/http-request-class.helper";

const usePlatform = (id?: number) => {
  return HttpRequest.get<Platform>(`/platforms/${id}`);
};

export default usePlatform;
