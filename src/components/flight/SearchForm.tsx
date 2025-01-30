import type React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Autocomplete } from "./AutoComplete"
import type { Airport, FlightSearchParams } from "../../types/flight"
import { ArrowRightLeft, Calendar, MapPin, Search, Users, ArrowLeftRight } from "lucide-react"

interface SearchFormProps {
    onSubmit: (params: FlightSearchParams) => void
    selectedOrigin: Airport | null
    selectedDestination: Airport | null
    onOriginChange: (airport: Airport | null) => void
    onDestinationChange: (airport: Airport | null) => void
    departureDate: Date | null
    onDepartureDateChange: (date: Date | null) => void
    returnDate: Date | null
    onReturnDateChange: (date: Date | null) => void
    passengers: number
    onPassengersChange: (count: number) => void
    tripType: "one-way" | "round-trip"
    onTripTypeChange: (type: "one-way" | "round-trip") => void
}

export const SearchForm: React.FC<SearchFormProps> = ({
    onSubmit,
    selectedOrigin,
    selectedDestination,
    onOriginChange,
    onDestinationChange,
    departureDate,
    onDepartureDateChange,
    returnDate,
    onReturnDateChange,
    passengers,
    onPassengersChange,
    tripType,
    onTripTypeChange,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedOrigin || !selectedDestination || !departureDate) return

        const params: FlightSearchParams = {
            originSkyId: selectedOrigin.skyId,
            originEntityId: selectedOrigin.entityId,
            destinationSkyId: selectedDestination.skyId,
            destinationEntityId: selectedDestination.entityId,
            date: departureDate.toISOString().split("T")[0],
            returnDate: returnDate?.toISOString().split("T")[0],
            adults: passengers,
            market: "US",
            currency: "USD",
        }

        onSubmit(params)
    }

    const handleSwitch = () => {
        const tempOrigin = selectedOrigin
        onOriginChange(selectedDestination)
        onDestinationChange(tempOrigin)
    }

    // Custom styles for the DatePicker wrapper
    const datePickerWrapperStyles = "relative w-full"
    
    // Custom styles for the DatePicker input
    const datePickerStyles = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors bg-white"

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-visible">
            <div className="p-8">
                {/* Trip Type Toggle */}
                <div className="flex gap-3 mb-8">
                    {(["round-trip", "one-way"] as const).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onTripTypeChange(type)}
                            className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${
                                tripType === type
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                            }`}
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                            <span className="capitalize text-sm font-medium">
                                {type.replace("-", " ")}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Origin/Destination Group */}
                    <div className="lg:col-span-5 flex flex-col gap-4 relative">
                        {/* Origin */}
                        <div className="flex-1">
                            <Autocomplete
                                label="Location"
                                placeholder="City or airport"
                                selected={selectedOrigin}
                                onSelect={onOriginChange}
                                icon={<MapPin className="w-5 h-5 text-gray-500" />}
                            />
                        </div>

                        {/* Switch Button */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <button
                                type="button"
                                onClick={handleSwitch}
                                className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all shadow-sm"
                                aria-label="Switch origin and destination"
                            >
                                <ArrowLeftRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Destination */}
                        <div className="flex-1">
                            <Autocomplete
                                label="Destination"
                                placeholder="City or airport"
                                selected={selectedDestination}
                                onSelect={onDestinationChange}
                                icon={<MapPin className="w-5 h-5 text-gray-500" />}
                            />
                        </div>
                    </div>

                    {/* Dates Section */}
                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Departure Date */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Departure
                            </label>
                            <div className={datePickerWrapperStyles}>
                                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 z-20" />
                                <DatePicker
                                    selected={departureDate}
                                    onChange={onDepartureDateChange}
                                    minDate={new Date()}
                                    className={datePickerStyles}
                                    placeholderText="Select date"
                                    calendarClassName="z-50"
                                    wrapperClassName="w-full"
                                    showPopperArrow={false}
                                />
                            </div>
                        </div>

                        {/* Return Date */}
                        {tripType === "round-trip" && (
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Return
                                </label>
                                <div className={datePickerWrapperStyles}>
                                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 z-20" />
                                    <DatePicker
                                        selected={returnDate}
                                        onChange={onReturnDateChange}
                                        minDate={departureDate || new Date()}
                                        className={datePickerStyles}
                                        placeholderText="Select date"
                                        calendarClassName="z-50"
                                        wrapperClassName="w-full"
                                        showPopperArrow={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Passengers & Search */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passengers
                            </label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                                <select
                                    value={passengers}
                                    onChange={(e) => onPassengersChange(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? "Passenger" : "Passengers"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3.5 px-6 rounded-lg font-semibold transition-all ${
                                !selectedOrigin || !selectedDestination || !departureDate
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                            }`}
                            disabled={!selectedOrigin || !selectedDestination || !departureDate}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Search className="w-5 h-5" />
                                <span>Search Flights</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}