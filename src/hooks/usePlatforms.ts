import { useQuery } from "@tanstack/react-query";
import Platform from "../entities/Platform";
import { HttpRequest } from "../helpers/http-request-class.helper";

interface PlatformsData {
  count: number;
  data: Platform[];
  page: number;
  perPage: number;
  offset: number;
}

const usePlatforms = () =>
  useQuery(["platforms"], () => HttpRequest.get<PlatformsData>("/platforms"));

export default usePlatforms;
