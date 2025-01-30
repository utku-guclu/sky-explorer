import axios from 'axios';

// Configure API client
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    },
    timeout: 15000 // 15 seconds timeout
});

// Create flight service module
export const FlightService = {
    // Search for airports by query (city, address, etc.)
    async searchAirports(query: string) {
        try {
            const response = await apiClient.get('/api/v1/flights/searchAirport', {
                params: { query }
            });

            console.log('Airport search response:', response.data);

            return response.data.data || {};  // Ensure it never returns undefined
        } catch (error) {
            console.error('Airport search error:', error);
            return {}; // Return empty object instead of undefined
            // throw new Error('Failed to search airports');
        }
    },

    // Search for flights
    async searchFlights(params: FlightSearchParams) {
        try {
            console.log('Flight Search Request:', params); // Log request
            const response = await apiClient.get('/api/v1/flights/searchFlights', {
                params: {
                    originSkyId: params.originSkyId,
                    destinationSkyId: params.destinationSkyId,
                    originEntityId: params.originEntityId,
                    destinationEntityId: params.destinationEntityId,
                    date: params.date,
                    returnDate: params.returnDate,
                    adults: params.adults || 1,
                    currency: 'USD',
                    market: 'US',
                    locale: 'en-US',
                    countryCode: 'US'
                }
            });

            console.log('Flight search response:', response.data);

            if (response.data.status === 'failure') {
                throw new Error('No flights found for given criteria');
            }

            return response.data.data;
        } catch (error) {
            console.error('Flight search error:', error);
            throw new Error('Failed to search flights');
        }
    },

    // Get nearby airports by latitude/longitude
    async getNearbyAirports(lat: number, lng: number) {
        const response = await apiClient.get('/api/v1/flights/getNearByAirports', {
            params: { lat, lng }
        });
        return response.data.data;
    }
};

// Type definitions
export type FlightSearchParams = {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    date: string;
    returnDate?: string;
    adults?: number;
};