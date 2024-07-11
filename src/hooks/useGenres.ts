import { useQuery } from '@tanstack/react-query';
import Genre from '../entities/Genre';
import { HttpRequest } from '../helpers/http-request-class.helper';


const useGenres = () =>
  useQuery({
    //@ts-ignore
    queryKey: ['genres'],
    queryFn: HttpRequest.get<Genre[]>('/genres/all')
  });

export default useGenres;
