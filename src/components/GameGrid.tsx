// components/GameGrid.js
import React, { useState } from "react";
import GameCard from "./GameCard";
import CardSkeleton from "./CardSkeleton";
import Button from "./common/Button";
import CardContainer from "./CardContainer";
import { IGetGamesResponse } from "../responses/get-games.respone";
import ErrorPage from "../pages/ErrorPage";

interface Props {
  data?: IGetGamesResponse;
  error: Error | null;
  isLoading: boolean;
}
const GameGrid = ({ data, error, isLoading }: Props) => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const skeletons = [1, 2, 3, 4, 5, 6];
  if (error) {
    if (!data) {
      return <ErrorPage />;
    }
    return <p className="text-2xl">{"An error occurred."}</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
      {isLoading &&
        skeletons.map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton />
          </CardContainer>
        ))}
      {data?.items.map((game, index) => (
        <React.Fragment key={index}>
          <CardContainer key={game.id}>
            <GameCard game={game} />
          </CardContainer>
        </React.Fragment>
      ))}
      {data?.items && (
        <>
          <Button
            color="primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            color="primary"
            disabled={page === Math.ceil(data?.pagination.count / perPage)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </>
      )}
    </div>
  );
};

export default GameGrid;
