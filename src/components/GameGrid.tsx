// components/GameGrid.js
import React from "react";
import GameCard from "./GameCard";
import CardSkeleton from "./CardSkeleton";
import CardContainer from "./CardContainer";
import { IGetGamesResponse } from "../responses/get-games.respone";
import ErrorPage from "../pages/ErrorPage";
import Pagination from "./common/Pagination";
import { useGameQueryStore } from "../store";

interface Props {
  data?: IGetGamesResponse;
  error: Error | null;
  isLoading: boolean;
}

const GameGrid = ({ data, error, isLoading }: Props) => {
  const skeletons = Array.from({ length: 6 }, (_, index) => index + 1);
  const { setPage, query } = useGameQueryStore();


  if (error) {
    return data ? <p className="text-2xl">{"An error occurred."}</p> : <ErrorPage />;
  }

  const renderSkeletons = () => (
    skeletons.map((skeleton) => (
      <CardContainer key={skeleton}>
        <CardSkeleton />
      </CardContainer>
    ))
  );

  const renderGameCards = () => (
    data?.items.map((game) => {
      const gameCount = data.likesCount.find(item => item.game_id === game.id)?.count || 0;
      return (
        <CardContainer key={game.id}>
          <GameCard game={game} likes={gameCount} />
        </CardContainer>
      );
    })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
      {isLoading ? renderSkeletons() : renderGameCards()}
      {data?.items && <Pagination setPage={setPage} count={data.pagination.count} page={query.page || 1} perPage={query.perPage || 10} />}
    </div>
  );
};

export default GameGrid;
