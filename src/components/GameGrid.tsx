// components/GameGrid.js
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchGames } from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import Button from "./common/Button";

const GameGrid = () => {

  // if (error || !data?.pages?.length) {
    // return <p>{error?.message ?? "An error occurred."}</p>;
  // }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
      {/* {isLoading && skeletons.map((skeleton) => (
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
        color="primary"
        size="md"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </Button> */}
    </div>
  );
};

export default GameGrid;
