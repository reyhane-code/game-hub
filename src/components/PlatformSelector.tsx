import platforms from "../data/platforms";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";
import Select from "./common/Select";

const PlatformSelector = async () => {
  const { data, error } = usePlatforms();
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);
  // if (error) return null;
  console.log(selectedPlatformId);
  return (

      <details className="dropdown">
        <summary className="btn m-1">{selectedPlatform?.name || "Platforms"}</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {data?.data.map(platform)=>{
          <li onClick={() => setSelectedPlatformId(platform.id)}key={platform.id}>
            {platform.name} 
          </li>
        }}
        </ul>
      </details>
     
  );
};

export default PlatformSelector;
