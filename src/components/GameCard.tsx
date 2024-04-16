import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Image from "./common/Image";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Link to={"/games/" + game.slug} className="group card w-96 bg-base-100 shadow-sm group-hover:shadow-2xl cursor-pointer">
      <figure>
        <Image
          source={getCroppedImageUrl(game.background_image)}
          altText={game.name}
          className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">
          {game.name}
          {/* <Emoji rating={game.rating_top} /> */}
        </h2>
        <div className="card-actions justify-end">
          {/* <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          /> */}
          <CriticScore score={game.metacritic} />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
