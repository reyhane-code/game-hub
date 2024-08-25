import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery } from "../interfaces";
import Article from "../entities/Article";
import useArticleQueryStore from "../articles.store";

export interface ArticlesData {
  count: number;
  data: Article;
  page: number;
  perPage: number;
  offset: number;
  likes: number;
}

const fetchArticles = async (
  articlesQuery: IPaginationQuery,
  page: number,
  perPage: number
) => {
  try {
    const params = {
      page: page,
      perPage: perPage,
      filter: articlesQuery.filter,
      search: articlesQuery.search,
      sortBy: articlesQuery.sortBy,
    };
    const res = await HttpRequest.get<ArticlesData>("/v1/articles/paginate", {
      params,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const useArticles = (page: number, perPage: number) => {
  const articlesQuery = useArticleQueryStore((s) => s.articleQuery);

  return useQuery<ArticlesData, Error>(["articles", articlesQuery, page], () =>
    fetchArticles(articlesQuery, page, perPage)
  );
};
