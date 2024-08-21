import useGenres from "../hooks/useGenres";
import useGameQueryStore from "../games.store";
import Genre from "../entities/Genre";
import { FilterOperationEnum } from "../enums";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const filter = useGameQueryStore((s) => s.gameQuery.filter);
  const setSelectedGenreId = useGameQueryStore((s) => s.setFilter);
  if (error) return null;
  if (isLoading)
    return <span className="loading loading-ring loading-lg">Loading</span>;

  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-9 mb-3">Genres</h2>
      <ul>
        {data?.map((genre: Genre) => (
          <li key={genre.id} className="space-x-1 w-30 py-5px mb-4">
            <div
              className="flex cursor-pointer"
              onClick={() =>
                setSelectedGenreId({
                  field: "genre.id",
                  operation: FilterOperationEnum.EQ,
                  value: genre.id,
                })
              }
            >
              {/* <Image
                className="rounded-sm w-10 h-10 bg-cover"
                src={getCroppedImageUrl(genre.image_background)}
            /> */}
              <span
                className={`whitespace-normal text-left text-md p-1 mx-2 text-sm ${
                  filter?.some(
                    (item) =>
                      item.value === genre.id && item.field === "genre.id"
                  )
                    ? "font-bold"
                    : "font-Regular"
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
