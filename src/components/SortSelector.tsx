import useGameQueryStore from "../store";
import Select from "./common/Select";

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
  // const handleClick = (value:string) =>{
  //   setSortOrder(value)
  //   const element = document.activeElement
  //   if(element){
  //     element?.blur()
  //   }
  // }

  return (
    <Select
      selectText={currentSortOrder?.label || "Relevance"}
      itemsList={sortOrders}
      onValueChange={(value) => setSortOrder(value.target.value)}
      showField="label"
    />
  );
};

export default SortSelector;
