import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useGameQueryStore from "../games.store";
import { IPaginationQuery } from "../interfaces";

export interface ArticleData {
  count: number;
  data: ArticleResponse[];
  page: number;
  perPage: number;
  offset: number;
  likes: number;
}

export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  user_id: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
const fetchArticles = async (
  gameQuery: IPaginationQuery,
  page: number,
  perPage: number
) => {
  try {
    const params = {
      page: page,
      perPage: perPage,
    };
    const res = await HttpRequest.get<ArticleData>("/v1/articles/paginate", {
      params,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const useGames = (page: number, perPage: number) => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useQuery<ArticleData, Error>(["articles", gameQuery, page], () =>
    fetchArticles(gameQuery, page, perPage)
  );
};
