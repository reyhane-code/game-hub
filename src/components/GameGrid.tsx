import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import Button from "./common/Button";

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <p>{error.message}</p>;

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.results.map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))}
        </React.Fragment>
      ))}
      <Button
        color="priamry"
        size="md"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};

export default GameGrid;
