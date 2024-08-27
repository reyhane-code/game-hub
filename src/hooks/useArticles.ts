import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery } from "../interfaces";
import { useArticleQueryStore } from "../store";
import { IGetArticlesResponse } from "../responses/get-articles.response";


const fetchArticles = async (
  articlesQuery: IPaginationQuery,

) => {
  try {
    const params = {
      page: articlesQuery.page,
      perPage: articlesQuery.perPage,
      filter: articlesQuery.filter,
      search: articlesQuery.search,
      sortBy: articlesQuery.sortBy,
    };
    const res = await HttpRequest.get<IGetArticlesResponse>("/v1/articles/paginate", {
      params,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const useArticles = () => {
  const { query: articlesQuery } = useArticleQueryStore();

  return useQuery<IGetArticlesResponse, Error>(["articles", articlesQuery, articlesQuery.page], () =>
    fetchArticles(articlesQuery)
  );
};
