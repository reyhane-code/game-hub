import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient, {
  FetchResponse,
} from '../services/api-client';
import useGameQueryStore from '../store';
import Game from '../entities/Game';
import { HttpRequest } from '../helpers/http-request-class.helper';


const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  // TODO: your response is not same of FetchResponse<Game> 
  // @ts-ignore
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      HttpRequest.get('/game/all',{
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms('24h'),
  });
};

export default useGames;
