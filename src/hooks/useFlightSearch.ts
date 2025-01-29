import { useQuery } from '@tanstack/react-query';
import { FlightService, FlightSearchParams } from '../services/api';

export const useFlightSearch = (params: FlightSearchParams) => {
  return useQuery({
    queryKey: ['flights', params],
    queryFn: () => FlightService.searchFlights(params),
    enabled: Boolean(
      params.originSkyId &&
      params.destinationSkyId &&
      params.date
    ),
    retry: 1,
    staleTime: 5 * 60 * 1000
  });
};