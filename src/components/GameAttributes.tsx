import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <div className="grid grid-cols-2">
      <DefinitionItem term="Platforms">
        {game.parent_platforms?.map(({ platform }) => (
          <span key={platform.id}>{platform.name}</span>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers?.map((publisher) => (
          <span key={publisher.id}>{publisher.name}</span>
        ))}
      </DefinitionItem>
    </div>
  );
};

export default GameAttributes;
