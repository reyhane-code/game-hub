import React, { useState } from "react";
import useGameQueryStore from "../games.store";

interface Props {
  sortbyOptions: Sortby[];
}

interface Sortby {
  value: string;
  label: string;
}

const SortSelector = ({ sortbyOptions }: Props) => {
  const [selectedValue, setSelectedValue] = useState("Sort");
  const setSortby = useGameQueryStore((state) => state.setSortBy);
  const sortby = useGameQueryStore((state) => state.gameQuery.sortBy);
  const currentSortOrder =
    sortbyOptions.find((order) => order.value === sortby) || sortbyOptions[0];

  const handleValueChange = (item: Sortby) => {
    setSortby(item.value);
    setSelectedValue(item.label);
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  return (
    <>
      <div className="dropdown z-10">
        <label tabIndex={0} className="btn m-1">
          {selectedValue}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
        >
          {sortbyOptions.map((item, index) => (
            <li
              className="cursor-pointer h-10"
              key={index}
              onClick={() => handleValueChange(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SortSelector;
