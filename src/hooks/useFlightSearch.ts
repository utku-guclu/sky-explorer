import { useQuery } from '@tanstack/react-query';
import { FlightService, FlightSearchParams } from '../services/api';
import { Flight } from '../types/flight';

interface UseFlightSearchOptions {
  filters: {
    stops: number[];
    airlines: string[];
  };
  sortBy: string;
}

export const useFlightSearch = (
  params: FlightSearchParams,
  options: UseFlightSearchOptions
) => {
  return useQuery({
    queryKey: ['flights', params, options],
    queryFn: () => FlightService.searchFlights(params),
    select: (data) => processFlightData(data, options.filters, options.sortBy),
    staleTime: 5 * 60 * 1000,
  });
};

const processFlightData = (
  data: Flight[],
  filters: UseFlightSearchOptions['filters'],
  sortBy: string
) => {
  return data
    .filter((flight) =>
      flight.legs.every(
        (leg) =>
          filters.stops.includes(leg.stopCount) &&
          leg.carriers.marketing.some((carrier) =>
            filters.airlines.includes(carrier.name)
          )
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price.raw - b.price.raw;
        case 'duration':
          return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
        case 'stops':
          return a.legs[0].stopCount - b.legs[0].stopCount;
        case 'departure':
          return (
            new Date(a.legs[0].departure).getTime() -
            new Date(b.legs[0].departure).getTime()
          );
        default:
          return 0;
      }
    });
};