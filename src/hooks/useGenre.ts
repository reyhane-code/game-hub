import Genre from "../entities/Genre";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useGenre = (id?: number) => {
  return HttpRequest.get<Genre>(`/genres/${id}`);
};

export default useGenre;
