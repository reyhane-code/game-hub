import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";
import Image from "./common/Image";
import Button from "./common/Button";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-9 mb-3">Genres</h2>
      <ul>
        {data?.results.map((genre) => (
          <li key={genre.id} className="space-x-1 w-30 py-5px">
            <div className="flex ">
              <Image
                className="rounded-sm w-12 h-12 bg-cover"
                source={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                className={`whitespace-normal text-left text-md ${
                  genre.id === selectedGenreId ? "bold" : "normal"
                } m-1`}
                onClick={() => setSelectedGenreId(genre.id)}
                color="gray-400"
                size="sm"
              >
                {genre.name}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
