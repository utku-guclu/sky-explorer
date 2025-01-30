import { motion } from "framer-motion"
import { useState } from "react"

interface FilterControlsProps {
    filters: {
        stops: number[]
        airlines: string[]
    }
    setFilters: (filters: { stops: number[]; airlines: string[] }) => void
    availableAirlines: string[]
}

export const FilterControls = ({ filters, setFilters, availableAirlines }: FilterControlsProps) => {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg mb-6"
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="text-blue-600 hover:text-blue-700">
                    {showFilters ? "Hide" : "Show"} Filters
                </button>
            </div>

            {showFilters && (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">Number of Stops</h4>
                        {[0, 1, 2].map((stopCount) => (
                            <label key={stopCount} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={filters.stops.includes(stopCount)}
                                    onChange={(e) => {
                                        const newStops = e.target.checked
                                            ? [...filters.stops, stopCount]
                                            : filters.stops.filter((s) => s !== stopCount)
                                        setFilters({ ...filters, stops: newStops })
                                    }}
                                    className="rounded text-blue-600"
                                />
                                <span>{stopCount === 0 ? "Non-stop" : `${stopCount} stop${stopCount > 1 ? "s" : ""}`}</span>
                            </label>
                        ))}
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Airlines</h4>
                        {availableAirlines.map((airline) => (
                            <label key={airline} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={filters.airlines.includes(airline)}
                                    onChange={(e) => {
                                        const newAirlines = e.target.checked
                                            ? [...filters.airlines, airline]
                                            : filters.airlines.filter((a) => a !== airline)
                                        setFilters({ ...filters, airlines: newAirlines })
                                    }}
                                    className="rounded text-blue-600"
                                />
                                <span>{airline}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    )
}


