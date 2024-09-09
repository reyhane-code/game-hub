import { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import TextInput from "./common/TextInput";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(location.search);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      navigate(`?${params.toString()}`);
    }, 300),
    [location.search, navigate]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") || "";
    setSearchTerm(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [location.search, debouncedSearch]);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="flex items-center p-2">
        <TextInput
          type="text"
          placeholder="Search..."
          onChange={(value: string) => handleSearchChange(value)}
          value={searchTerm}
          name="search"
        >
          <CiSearch className="text-3xl text-gray-600" />
        </TextInput>
      </div>

    </form>
  );
};

export default SearchInput;
