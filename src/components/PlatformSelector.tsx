import { useState } from "react";
import usePlatforms from "../hooks/usePlatforms";
import Platform from "../entities/Platform";
import { FilterOperationEnum } from "../enums";
import { useGameQueryStore } from "../store";

const PlatformSelector = () => {
  const { data = [], error } = usePlatforms(); // Default to an empty array if data is undefined
  const { setFilter: setSelectedPlatformId } = useGameQueryStore();
  const [selectedPlatformName, setSelectedPlatformName] = useState("Select a platform"); // Default option

  if (error) return null;

  // Create a new platform object and add it to the data array
  const platformsWithDefaultOption = [
    { id: -1, name: "Select a platform", slug: 'select-a-platform', created_at: Date.now() }, // Default option with a specific ID
    ...data,
  ];

  const handleItemClick = (platform: Platform) => {
    if (platform.id === -1) {
      // Set the filter to a specific value indicating no selection
      setSelectedPlatformId();
      setSelectedPlatformName(platform.name);
    } else {
      // Set the selected platform ID for other platforms
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
