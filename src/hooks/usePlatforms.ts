import { useQuery } from '@tanstack/react-query';
import Platform from '../entities/Platform';
import { HttpRequest } from '../helpers/http-request-class.helper';


const usePlatforms = () =>
  useQuery({
    //@ts-ignore
    queryKey: ['platforms'],
    queryFn: HttpRequest.get<Platform[]>('/platforms/all')
  });

export default usePlatforms;
