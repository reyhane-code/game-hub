import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import qs from 'qs';
import { HttpRequest } from '../helpers/http-request-class.helper';
import { IPaginationQuery, ISearchFilterOptions } from '../interfaces';

const useApi = <TData = unknown, TError = unknown>(endpoint: string) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query: IPaginationQuery = qs.parse(search, { ignoreQueryPrefix: true });

  const setQuery = (newQuery: Partial<IPaginationQuery>) => {
    const updatedQuery = { ...query, ...newQuery };
    navigate({ search: qs.stringify(updatedQuery, { addQueryPrefix: true }) });
  };

  const generateQueryString = (query: IPaginationQuery): string => {
    const params = new URLSearchParams();

    // Add pagination parameters
    if (query.page) params.append('page', String(query.page));
    if (query.perPage) params.append('perPage', String(query.perPage));

    // Add search parameters
    query.search?.forEach((item, index) => {
      params.append(`search[${index}][field]`, item.field);
      params.append(`search[${index}][operation]`, item.operation);
      params.append(`search[${index}][value]`, String(item.value));
    });

    // Add filter parameters
    query.filter?.forEach((item, index) => {
      params.append(`filter[${index}][field]`, item.field);
      params.append(`filter[${index}][operation]`, item.operation);
      params.append(`filter[${index}][value]`, String(item.value));
    });

    // Add sortBy parameter
    if (query.sortBy) params.append('sortBy', query.sortBy);

    return params.toString();
  };


  const fetchData = async (): Promise<TData> => {
    const queryString = generateQueryString(query);
    const response = await HttpRequest.get<TData>(`${endpoint}?${queryString}`);

    if (!response) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  };

  const { data, error, isLoading } = useQuery<TData, TError>(
    [endpoint, query],
    fetchData,
    {
      retry: false, // Disable automatic retries for failed requests
      onError: (error) => {
        console.error('Error fetching data:', error);
      },
    }
  );

  const addItem = (item: ISearchFilterOptions, type: 'filter' | 'search') => {
    const existingItems = query[type] || [];
    const itemExists = existingItems.some(existingItem =>
      existingItem.field === item.field && existingItem.operation === item.operation && existingItem.value === item.value
    );

    if (!itemExists) {
      setQuery({ [type]: [...existingItems, item] });
    } else {
      console.warn(`${type.charAt(0).toUpperCase() + type.slice(1)} item already exists`);
    }
  };


  const removeItemsByField = (fieldName: string, type: 'filter' | 'search') => {
    const existingItems = query[type] || [];
    // Filter out the entire item that matches the field name
    const filteredItems = existingItems.filter(item => item.field !== fieldName);

    // Only update the query if there are changes
    if (filteredItems.length < existingItems.length) {
      setQuery({ [type]: filteredItems });
    }
  };

  const setSortBy = (sortBy: string) => {
    setQuery({ sortBy });
  };

  const setPage = (page: number) => {
    setQuery({ page });
  };

  const setPerPage = (perPage: number) => {
    setQuery({ perPage });
  };

  const params: IPaginationQuery = {
    search: query.search || [],
    filter: query.filter || [],
    sortBy: query.sortBy || '',
    page: query.page || 1,
    perPage: query.perPage || 10,
  };

  return { data, error, isLoading, addItem, removeItemsByField, setSortBy, setPage, setPerPage, query, params };
};

export default useApi;
