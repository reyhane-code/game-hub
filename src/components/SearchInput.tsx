import { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import TextInput from "./common/TextInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import useSearch from "../hooks/useSearch"; // Ensure this hook fetches data based on the search term
import Button from "./common/Button";
import Modal from "./common/Modal";
import { ISearchFilterOptions } from "../interfaces";
import { FilterOperationEnum } from "../enums";

interface Props {
  addItem: (item: ISearchFilterOptions, type: 'filter' | 'search') => void;
  removeItemsByField: (fieldName: string, type: 'filter' | 'search') => void
}
const SearchInput = ({ addItem, removeItemsByField }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, error, isLoading } = useSearch(searchTerm);
  const navigate = useNavigate();
  const location = useLocation();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      addItem({
        field: 'name',
        operation: FilterOperationEnum.ILIKE,
        value
      }, 'search')
      // navigate(`?${params.toString()}`);
    }, 300),
    [location.search, navigate]
  );

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
    setIsModalOpen(!!value); // Open modal if there's a search term
  };

  // Handle showing all results
  const handleShowAll = (page: string) => {
    setIsModalOpen(false);
    if (page === 'games') {
      navigate(`/games?search=${encodeURIComponent(searchTerm)}`);
    } else if (page === 'articles') {
      navigate(`/articles?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Effect to handle URL search params
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
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
          rightSlot={<CiSearch className="text-3xl text-gray-600" />}
        />

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Search Results"
        message="Here are the top results for your search:"
        id="search-results-modal"
      >
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading search results.</p>}

        {data?.items.games && data.items.games.length > 0 ? (
          <div>
            <h3>Games</h3>
            <ul>
              {data.items.games.slice(0, 3).map(game => (
                <li key={game.id}>
                  <Link to={`/games/${game.slug}`}>{game.name}</Link>
                </li>
              ))}
            </ul>
            <Button color="primary" onClick={() => handleShowAll('games')}>Show All</Button>
          </div>
        ) : (
          <p>No games found.</p>
        )}

        {data?.items.articles && data.items.articles.length > 0 ? (
          <div>
            <h3>Articles</h3>
            <ul>
              {data.items.articles.slice(0, 3).map(article => (
                <li key={article.id}>
                  <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </li>
              ))}
            </ul>
            <Button color="primary" onClick={() => handleShowAll('articles')}>Show All</Button>
          </div>
        ) : (
          <p>No articles found.</p>
        )}
      </Modal>
    </form>
  );
};

export default SearchInput;
