import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useGameQueryStore from "../store";

const GameHeading = async () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = await useGenre(genreId);

  const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const platform = await usePlatform(platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return <h1 className="my-5 text-5xl">{heading}</h1>;
};

export default GameHeading;
