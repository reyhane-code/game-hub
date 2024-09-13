import { useState } from "react";
import usePlatforms from "../hooks/usePlatforms";
import Platform from "../entities/Platform";
import { FilterOperationEnum } from "../enums";
import { ISearchFilterOptions } from "../interfaces";

interface Props {
  addItem: (item: ISearchFilterOptions, type: 'filter' | 'search') => void;
  removeItemsByField: (fieldName: string, type: 'filter' | 'search') => void
}

const PlatformSelector = ({ addItem, removeItemsByField }: Props) => {
  const { data = { items: [] }, error } = usePlatforms();
  const [selectedPlatformName, setSelectedPlatformName] = useState("All Platforms");

  if (error) return null;

  const platformsWithDefaultOption = [
    { id: -1, name: "All Platforms", slug: 'all-platforms', created_at: new Date() },
    ...data.items,
  ];

  const handlePlatformChange = (platform: Platform) => {
    const isAllPlatforms = platform.id === -1;

    // Remove existing platform filters
    removeItemsByField('platform.id', 'filter');

    // Update selected platform name
    setSelectedPlatformName(platform.name);

    // If the selected platform is not "All Platforms", add the new filter
    if (!isAllPlatforms) {
      const newItem = {
        field: "platform.id",
        operation: FilterOperationEnum.EQ,
        value: platform.id,
      };
      addItem(newItem, 'filter');
    }

    // Blur the active element
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
            onClick={() => handlePlatformChange(platform)}
          >
            {platform.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelector;
