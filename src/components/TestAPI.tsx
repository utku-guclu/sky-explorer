import { useEffect } from 'react';
import { FlightService } from '../services/api';

interface Airport {
    skyId: string;
    entityId: string;
    presentation: {
        title: string;
        suggestionTitle: string;
        subtitle: string;
    };
}

export const TestAPI = () => {
    useEffect(() => {
        const testFlightSearch = async () => {
            try {
                // Search for valid airport IDs
                const originAirports = await FlightService.searchAirports('JFK');
                const destinationAirports = await FlightService.searchAirports('LAX');

                const origin = originAirports.find((a: Airport) =>
                    a.presentation.title.includes('John F. Kennedy')
                );
                const destination = destinationAirports.find((a: Airport) =>
                    a.presentation.title.includes('Los Angeles')
                );

                if (!origin || !destination) {
                    throw new Error('Airports not found');
                }

                // Search flights with valid IDs
                const flights = await FlightService.searchFlights({
                    originSkyId: origin.skyId,
                    originEntityId: origin.entityId,
                    destinationSkyId: destination.skyId,
                    destinationEntityId: destination.entityId,
                    date: '2025-01-30',
                    adults: 1,
                });

                console.log('Flight search success:', flights);
            } catch (error) {
                console.error('Test failed:', error);
            }
        };

        testFlightSearch();
    }, []);

    return <div>Testing API connections...</div>;
};