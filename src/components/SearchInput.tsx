import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import TextInput from "./common/TextInput";
import { FilterOperationEnum } from "../enums";
import { useGameQueryStore } from "../store";

const SearchInput = () => {
  const { setSearch } = useGameQueryStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setSearch({
        field: "name",
        operation: FilterOperationEnum.LIKE,
        value: `%${value}%`,
      });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <TextInput
        type="text"
        placeholder="Search games..."
        onChange={handleSearchChange}
        value={searchTerm}
      >
        <BsSearch />
      </TextInput>
    </form>
  );
};

export default SearchInput;
