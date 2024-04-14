import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";
import Select from "./common/Select";

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  if (error) return null;

  return (
    <Select
      selectText={selectedPlatform?.name || "Platforms"}
      itemsList={data?.results}
      showField="name"
      //TODO: ask him
      onValueChange={(value) => {}}
    />
  );
};

export default PlatformSelector;
