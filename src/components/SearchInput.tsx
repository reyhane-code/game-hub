import { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import TextInput from "./common/TextInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import useSearch from "../hooks/useSearch";
import Button from "./common/Button";
import Modal from "./common/Modal";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, error, isLoading } = useSearch(searchTerm);
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
    if (value) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleShowAll = (page: string) => {
    setIsModalOpen(false);
    if (page == 'games') {
      navigate(`/?search=${searchTerm}`);
    } else if (page == 'articles') {
      navigate(`/articles/?search=${searchTerm}`);
    }
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
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        >
          <CiSearch className="text-3xl text-gray-600" />
        </TextInput>
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
            {'Games'}
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
          <p>No results found.</p>
        )}

        {data?.items.games && data.items.games.length > 0 ? (
          <div>
            {'Articles'}
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
          <p>No results found.</p>
        )}
      </Modal>
    </form>
  );
};

export default SearchInput;
