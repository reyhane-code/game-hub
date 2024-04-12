import { Heading, HStack } from "@chakra-ui/react";
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
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      {/* //TODO: use ul/ol and li */}
      <ul>
        {data?.results.map((genre) => (
          <li key={genre.id} className="py-5px">
            <HStack>
              <Image
                width="[20px]"
                height="[20px]"
                styles="rounded-xl object-cover"
                source={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                styles="whitespace-normal text-left text-md"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                onClick={() => setSelectedGenreId(genre.id)}
                margin="1"
                color=""
              >
                {genre.name}
              </Button>
            </HStack>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreList;
