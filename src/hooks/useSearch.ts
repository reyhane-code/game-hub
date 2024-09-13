import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Article from "../entities/Article";

interface SearchResult {
    items: {
        articles: Article[];
        games: {
            id: number;
            name: string;
            slug: string;
            description: string;
            background_image: string;
            metacritic: number;
            rating_top: number;
            platforms: {
                id: number;
                name: string;
                slug: string;
            }[];
            genres: {
                id: number;
                name: string;
            }[];
            publishers: {
                id: number;
                name: string;
            }[];
        }[];
    };
}

const useSearch = (searchText: string) => {
    return useQuery<SearchResult, Error>(
        ['search', searchText],
        async () => {
            const res = await HttpRequest.get<SearchResult>(`/v1/search/${searchText}`);
            return res.data;
        },
        {
            onError: (error) => {
                console.error('An error occurred while fetching search data:', error);
            },
            enabled: !!searchText, // Only run the query if searchText is not empty
        }
    );
};

export default useSearch;
