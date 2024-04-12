import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";

const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <details className="dropdown">
      <summary className="m-1 btn">
        {" "}
        Order by: {currentSortOrder?.label || "Relevance"}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {sortOrders.map((order) => (
          <li
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            <a>{order.label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default SortSelector;
