import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useGenres = () =>
  useQuery(["genres"], () =>
    HttpRequest.get<Genre[]>("/genres").then((res) => res.data)
  );

export default useGenres;
