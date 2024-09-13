import GameGrid from "./GameGrid";
import useApi from "../hooks/useApi";
import { IGetGamesResponse } from "../responses/get-games.response";
import EmptyList from "./common/EmptyList";
import PlatformSelector from "./PlatformSelector";
import GenreList from "./GenreList";
import SortSelector from "./SortSelector";

const GamesContainer = () => {
    const { data, error, isLoading, params, setPage, addItem, removeItemsByField } = useApi<IGetGamesResponse, Error>('/v1/games');

    return (
        <>
            {isLoading && <span>Loading...</span>}
            {error && <span>An error occurred: {error.message}</span>}
            <div>
                <GenreList addItem={addItem} removeItemsByField={removeItemsByField} />
                <PlatformSelector addItem={addItem} removeItemsByField={removeItemsByField} />
                <SortSelector
                    sortbyOptions={[
                        { value: "", label: "Relevance" },
                        { value: "-added", label: "Date added" },
                        { value: "name", label: "Name" },
                        { value: "-released", label: "Release date" },
                        { value: "-metacritic", label: "Popularity" },
                        { value: "-rating", label: "Average rating" },
                    ]}
                />
            </div>

            {data ? (
                <GameGrid data={data} error={error} isLoading={isLoading} page={params.page || 1} setPage={setPage} perPage={params.perPage || 10} />
            ) : (
                <EmptyList itemType="games" />
            )}
        </>
    );
};

export default GamesContainer;


