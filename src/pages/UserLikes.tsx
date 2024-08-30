import { useEffect, useState } from "react";
import useUserLikes from "../hooks/useUserLikes";
import GameGrid from "../components/GameGrid";
import { useLocation } from "react-router-dom";
import ArticleGrid from "../components/ArticleGrid";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import { IGetGamesResponse } from "../responses/get-games.respone";

const UserLikes = () => {
  const [entity, setEntity] = useState('game');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(initialPage);
  const { data, error, isLoading } = useUserLikes<IGetGamesResponse | IGetArticlesResponse>(entity);
  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  return (
    <>
      <div>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab text-lg"
            aria-label="Games"
            checked={entity === 'game'}
            onChange={() => setEntity('game')}
          />
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab text-lg"
            aria-label="Articles"
            checked={entity === 'article'}
            onChange={() => setEntity('article')}
          />
        </div>

        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          {isLoading && <span>Loading...</span>}
          {error && <span>An error occurred: {error.message}</span>}
          {entity === 'game' && (data && data.items.length > 0) ? (
            <GameGrid data={data as IGetGamesResponse} error={error} isLoading={isLoading} page={page} setPage={setPage} />
          ) : entity === 'article' ? (
            <span>No games were found!</span>
          ) : entity === 'article' && (data && data.items.length > 0) ? (
            <ArticleGrid data={data as IGetArticlesResponse} error={error} isLoading={isLoading} page={page} setPage={setPage} />
          ) : (
            <span>No articles were found!</span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserLikes;
