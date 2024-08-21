import { useState } from "react";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../games.store";
import Platform from "../entities/Platform";
import { FilterOperationEnum } from "../enums";

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const setSelectedPlatformId = useGameQueryStore((s) => s.setFilter);
  const [selectedPlatformName, setSelectedPlatformName] = useState("Platforms");
  if (error) return null;
  const handleItemClick = (platform: Platform) => {
    setSelectedPlatformId({
      field: "platform.id",
      operation: FilterOperationEnum.EQ,
      value: platform.id,
    });
    setSelectedPlatformName(platform.name);
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  return (
    <>
      <div className="dropdown z-10">
        <label tabIndex={0} className="btn m-1">
          {selectedPlatformName}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
        >
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
      </div>
    </>
  );
};

export default PlatformSelector;
