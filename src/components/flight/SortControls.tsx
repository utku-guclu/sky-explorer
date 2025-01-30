import { motion } from "framer-motion"

interface SortControlsProps {
    sortBy: string
    setSortBy: (value: string) => void
}

export const SortControls = ({ sortBy, setSortBy }: SortControlsProps) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-4 rounded-lg shadow-lg mb-6"
    >
        <h3 className="text-lg font-semibold mb-3">Sort by</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {[
                { value: "price", label: "Cheapest" },
                { value: "duration", label: "Shortest" },
                { value: "stops", label: "Fewest Stops" },
                { value: "departure", label: "Departure Time" },
            ].map((option) => (
                <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`p-2 rounded-lg transition-colors ${sortBy === option.value ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    </motion.div>
)
