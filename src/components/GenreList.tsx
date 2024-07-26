import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";
import Image from "./common/Image";
import Button from "./common/Button";
import Genre from "../entities/Genre";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);
  if (error) return null;
  if (isLoading)
    return <span className="loading loading-ring loading-lg">Loading</span>;

  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-9 mb-3">Genres</h2>
      <ul>
        {data?.map((genre:Genre) => (
          <li key={genre.id} className="space-x-1 w-30 py-5px mb-4">
            <div
              className="flex cursor-pointer"
              onClick={() => setSelectedGenreId(genre.id)}
            >
              {/* <Image
                className="rounded-sm w-10 h-10 bg-cover"
                src={getCroppedImageUrl(genre.image_background)}
            /> */}
              <span
                className={`whitespace-normal text-left text-md p-1 mx-2 text-sm ${
                  genre.id === selectedGenreId ? "font-bold" : "font-Regular"
                } m-1`}
              >
                {genre.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
