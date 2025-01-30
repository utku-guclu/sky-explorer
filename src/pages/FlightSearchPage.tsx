import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowRightLeft, Plane, MapPin } from "lucide-react"
import { FlightService } from "../services/api"
import { FilterControls, SortControls, ResultsList } from "../components/flight"
import type { Airport, Flight, FlightSearchParams } from "../types/flight"
import { SearchForm } from "../components/flight/SearchForm"

export const FlightSearchPage = () => {
    // Search parameters
    const [selectedOrigin, setSelectedOrigin] = useState<Airport | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Airport | null>(null);
    const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
    const [showSearchPanel, setShowSearchPanel] = useState(true);

    // Filters & Sorting
    const [filters, setFilters] = useState({
        stops: [0, 1, 2],
        airlines: [] as string[],
    })
    const [sortBy, setSortBy] = useState("price")

    // Search query configuration
    const searchParams: FlightSearchParams = {
        originSkyId: selectedOrigin?.skyId || '',
        originEntityId: selectedOrigin?.entityId || '',
        destinationSkyId: selectedDestination?.skyId || '',
        destinationEntityId: selectedDestination?.entityId || '',
        date: departureDate?.toISOString().split('T')[0] || '',
        returnDate: tripType === 'round-trip' && returnDate ? returnDate.toISOString().split('T')[0] : undefined,
        adults: passengers,
    };

    // Data fetching
    const { data: rawFlights, isLoading, error } = useQuery({
        queryKey: ['flights', searchParams],
        queryFn: () => FlightService.searchFlights(searchParams),
        enabled: !!selectedOrigin && !!selectedDestination && !!departureDate,
        retry: 1,
    });

    // Process flights data
    const processedFlights = useMemo(() => {
        if (!rawFlights?.itineraries) return [];

        // Filtering
        let result = rawFlights.itineraries.filter((flight: Flight) =>
            flight.legs.every((leg) =>
                filters.stops.includes(leg.stopCount) &&
                leg.carriers.marketing.some(c => filters.airlines.includes(c.name))
            )
        );

        // Sorting
        result = result.sort((a: Flight, b: Flight) => {
            switch (sortBy) {
                case 'price':
                    return a.price.raw - b.price.raw;
                case 'duration':
                    return a.legs.reduce((sum, leg) => sum + leg.durationInMinutes, 0) -
                        b.legs.reduce((sum, leg) => sum + leg.durationInMinutes, 0);
                case 'stops':
                    return Math.min(...a.legs.map(leg => leg.stopCount)) -
                        Math.min(...b.legs.map(leg => leg.stopCount));
                case 'departure':
                    return new Date(a.legs[0].departure).getTime() -
                        new Date(b.legs[0].departure).getTime();
                default:
                    return 0;
            }
        });

        return result;
    }, [rawFlights, filters, sortBy]);

    const availableAirlines = useMemo(() => {
        const airlines = new Set<string>();
        rawFlights?.itineraries?.forEach((flight: Flight) =>
            flight.legs.forEach(leg =>
                leg.carriers.marketing.forEach(c => airlines.add(c.name))
            )
        );
        return Array.from(airlines);
    }, [rawFlights]);

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="pt-8 pb-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <Plane color="#4F46E5" className="text-white w-8 h-8" />
                            <h1 className="text-3xl font-bold text-black" style={{ color: "#4F46E5" }}>
                                Sky Explorer
                            </h1>
                        </div>
                    </div>

                    {/* Search Panel */}
                    <motion.div
                        initial={false}
                        animate={showSearchPanel ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <SearchForm
                            onSubmit={() => setShowSearchPanel(false)}
                            selectedOrigin={selectedOrigin}
                            selectedDestination={selectedDestination}
                            onOriginChange={setSelectedOrigin}
                            onDestinationChange={setSelectedDestination}
                            departureDate={departureDate}
                            onDepartureDateChange={setDepartureDate}
                            returnDate={returnDate}
                            onReturnDateChange={setReturnDate}
                            passengers={passengers}
                            onPassengersChange={setPassengers}
                            tripType={tripType}
                            onTripTypeChange={setTripType}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <SortControls sortBy={sortBy} setSortBy={setSortBy} />
                            <FilterControls filters={filters} setFilters={setFilters} availableAirlines={availableAirlines} />
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="lg:col-span-3">
                        {/* Modified Search Bar */}
                        {!showSearchPanel && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-lg p-4 mb-6 flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium">{selectedOrigin?.presentation.title}</span>
                                    </div>
                                    <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium">{selectedDestination?.presentation.title}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowSearchPanel(true)}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Modify Search
                                </button>
                            </motion.div>
                        )}

                        {/* Results List */}
                        <ResultsList
                            flights={processedFlights}
                            isLoading={isLoading}
                            error={error} />
                    </div>
                </div>
            </div>
        </div>
    )
}
