import React, { useState, useEffect, useRef } from "react";
import TextInput from "./common/TextInput";
import { CiSearch } from "react-icons/ci";
import { debounce } from 'lodash';
import useSearch from "../hooks/useSearch";
import { Link, useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Modal from "./common/Modal";
import useApi from "../hooks/useApi";
import { FilterOperationEnum } from "../enums";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useSearch(searchTerm);
  const navigate = useNavigate();
  const { addItem } = useApi<any, Error>(''); // Ensure the correct type is used

  const handleSearchDebounce = useRef(
    debounce((value) => {
      setSearchTerm(value);
    }, 300)
  ).current;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") || "";
    setSearchTerm(searchValue);

    return () => {
      handleSearchDebounce.cancel();
    };
  }, [location.search, handleSearchDebounce]);
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    handleSearchDebounce(value);
    setIsModalOpen(true);
  };

  const handleShowAll = (page: string) => {
    setIsModalOpen(false); // Close modal when showing all
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    if (page === 'games') {
      addItem({ field: 'name', operation: FilterOperationEnum.ILIKE, value: encodedSearchTerm }, 'search');
      navigate('/');
    } else if (page === 'articles') {
      addItem({ field: 'title', operation: FilterOperationEnum.ILIKE, value: encodedSearchTerm }, 'search');
      navigate('/articles');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          type="text"
          placeholder="Search..."
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          rightSlot={<CiSearch className="text-3xl text-gray-600" />}
        />
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Search Results"
        message=""
        id="search-results-modal"
      >
        {error && <p>Error loading search results: {error.message}</p>}
        {(!data?.items.articles?.length && !data?.items.games?.length) ? (
          <p>No results were found!</p>
        ) : (
          <>
            {data?.items.games?.length > 0 && (
              <div>
                <h3>Games</h3>
                <ul className="bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  {data.items.games.slice(0, 3).map(game => (
                    <li key={game.id}>
                      <Link to={`/games/${game.slug}`}>{game.name}</Link>
                    </li>
                  ))}
                </ul>
                <Button color="primary" onClick={() => handleShowAll('games')}>Show All</Button>
              </div>
            )}
            {data?.items.articles?.length > 0 && (
              <div>
                <h3>Articles</h3>
                <ul className="bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  {data.items.articles.slice(0, 3).map(article => (
                    <li key={article.id}>
                      <Link to={`/articles/${article.id}`}>{article.title}</Link>
                    </li>
                  ))}
                </ul>
                <Button color="primary" onClick={() => handleShowAll('articles')}>Show All</Button>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default SearchInput;
