import { useState } from "react";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";
import Platform from "../entities/Platform";

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const [selectedPlatformName, setSelectedPlatformName] = useState("Platforms");
  if (error) return null;
  const handleItemClick = (platform: Platform) => {
    console.log("before", selectedPlatformId);
    setSelectedPlatformId(platform.id);
    setSelectedPlatformName(platform.name);
    console.log("after", selectedPlatformId);
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1">{selectedPlatformName}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {data?.map((platform) => (
          <li
            className="cursor-pointer h-10"
            key={platform.id}
            onClick={() => handleItemClick(platform)}
          >
            {platform.name}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default PlatformSelector;
