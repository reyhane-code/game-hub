import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../games.store";
import TextInput from "./common/TextInput";
import { FilterOperationEnum } from "../enums";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearch);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText({
            field: "name",
            operation: FilterOperationEnum.LIKE,
            value: `%${ref.current.value}%`,
          });
          navigate("/");
        }
      }}
    >
      <TextInput type="text" placeholder="Search games...">
        {/* use svg later */}
        <BsSearch />
      </TextInput>
    </form>
  );
};

export default SearchInput;
