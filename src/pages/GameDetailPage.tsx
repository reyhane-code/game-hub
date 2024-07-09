import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  
  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error || !game) throw error;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="col-start">
        <h1 className="text-xl">{game.name}</h1>
  
        <ExpandableText>{game.description}</ExpandableText>
        <GameAttributes game={game} />
      </div>
      <div>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </div>
    </div>
  );
};

export default GameDetailPage;
