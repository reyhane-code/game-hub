import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import { HttpRequest } from "../helpers/http-request-class.helper";

interface GenreData {
  count: number;
  data: Genre[];
  page: number;
  perPage: number;
  offset: number;
}

const useGenres = () =>
  useQuery(["genres"], () => HttpRequest.get<GenreData>("/genres"));

export default useGenres;
