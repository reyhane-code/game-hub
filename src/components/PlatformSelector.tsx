import { useState } from "react";
import usePlatforms from "../hooks/usePlatforms";
import Platform from "../entities/Platform";
import { FilterOperationEnum } from "../enums";
import { useGameQueryStore } from "../store";

const PlatformSelector = () => {
  const { data = [], error } = usePlatforms();
  const { setFilter: setSelectedPlatformId } = useGameQueryStore();
  const [selectedPlatformName, setSelectedPlatformName] = useState("Select a platform");

  if (error) return null;

  const platformsWithDefaultOption = [
    { id: -1, name: "Select a platform", slug: 'select-a-platform', created_at: new Date() },
    ...data,
  ];

  const handleItemClick = (platform: Platform) => {
    if (platform.id === -1) {
      setSelectedPlatformId();
      setSelectedPlatformName(platform.name);
    } else {
      setSelectedPlatformId({
        field: "platform.id",
        operation: FilterOperationEnum.EQ,
        value: platform.id,
      });
      setSelectedPlatformName(platform.name);
    }

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  return (
    <div className="dropdown z-10">
      <label tabIndex={0} className="btn m-1">
        {selectedPlatformName}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        {platformsWithDefaultOption.map((platform) => (
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
  );
};

export default PlatformSelector;
