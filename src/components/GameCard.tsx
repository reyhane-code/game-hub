import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Image from "./common/Image";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Link to={"/games/" + game.slug} className="group card w-full bg-base-300 cursor-pointer">
      <figure>
        <Image
          src={getCroppedImageUrl(game.background_image)}
          altText={game.name}
          className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
        />
      </figure>
      <div className="card-body !p-3">
        <h2 className="card-title text-base lg:text-lg">
          {game.name}
          <Emoji rating={game.rating_top} />
        </h2>
        <div className="flex items-center justify-between w-full mt-2.5">

          <div className="flex items-center space-x-1">
            {game.parent_platforms.slice(0, 2)?.map((p) =>
              <div className="bg-neutral-800 rounded-sm px-2 py-0.5 flex-center" key={p.platform.id}>
                <span className="text-xs text-neutral-300"> {p.platform.name}</span>
              </div>)}
          </div>
          <CriticScore score={game.metacritic} />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
