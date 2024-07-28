// components/GameGrid.js
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import Button from "./common/Button";
import { useGames } from "../hooks/useGames";

const GameGrid = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const skeletons = [1, 2, 3, 4, 5, 6];
  const { data, error, isLoading } = useGames(page, perPage);
  if (error) {
    if(!data){
      //direct to error page 
    }
    return <p className="text-2xl">{"An error occurred."}</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      {data?.data.map((game, index) => (
        <React.Fragment key={index}>
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        </React.Fragment>
      ))}
      {data?.data && (
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
            disabled={page === Math.ceil(data?.count / perPage)}
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
