import { GamesResponse } from "../hooks/useGames";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: GamesResponse;
}

const GameAttributes = ({ game }: Props) => {

  return (
    <div className="grid grid-cols-2 items-start">
      <DefinitionItem term="Platforms">
        {game.platforms?.map((platform) => (
          <span
            key={platform.id}
            className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
          >
            {platform.name}
          </span>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((genre) => (
          <span
            className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
            key={genre.id}
          >
            {genre.name}
          </span>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers?.map((publisher) => (
          <span
            className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
            key={publisher.id}
          >
            {publisher.name}
          </span>
        ))}
      </DefinitionItem>

      
    </div>
  );
};

export default GameAttributes;
