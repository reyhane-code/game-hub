import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  if (error) return null;

  return (
    <details className="dropdown">
      <summary className="m-1 btn">
        {selectedPlatform?.name || "Platforms"}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {data?.results.map((platform) => (
          <li
            onClick={() => setSelectedPlatformId(platform.id)}
            key={platform.id}
          >
            <a>{platform.name}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default PlatformSelector;
