import React, { useState, useEffect, useRef } from "react";
import TextInput from "./common/TextInput";
import { CiSearch } from "react-icons/ci";
import debounce from 'lodash.debounce';
import useSearch from "../hooks/useSearch";
import { Link, useNavigate } from "react-router-dom";
import Button from "./common/Button";
import useApi from "../hooks/useApi";
import { FilterOperationEnum } from "../enums";
import OutsideClickHandler from 'react-outside-click-handler';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useSearch(searchTerm);
  const navigate = useNavigate();
  const { generateRouteQuery } = useApi<any, Error>(''); // Ensure the correct type is used


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") || "";
    setSearchTerm(searchValue);

  }, [location.search]);



  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setIsModalOpen(true);
  };

  const handleShowAll = (page: string) => {
    setIsModalOpen(false); // Close modal when showing all
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    if (page === 'games') {
      const query = generateRouteQuery({ field: 'name', operation: FilterOperationEnum.ILIKE, value: encodedSearchTerm }, 'search');
      navigate(`/${query}`);
    } else if (page === 'articles') {
      const query = generateRouteQuery({ field: 'title', operation: FilterOperationEnum.ILIKE, value: encodedSearchTerm }, 'search');
      setTimeout(() => {
        console.log('query', query)
        navigate(`/articles/${query}`);
      }, 100);
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

      {
        (isModalOpen && searchTerm != '') &&
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsModalOpen(false)
          }}
        >
          <div
            className="fixed top-14 inset-x-0 bg-white rounded-xl min-h-24 p-4 shadow-md"
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
          </div>
        </OutsideClickHandler>
      }
    </div>
  );
};

export default SearchInput;
