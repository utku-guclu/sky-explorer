import { AnimatePresence, motion } from "framer-motion";
import { Flight } from "../../types/flight";
import { FlightCard } from "./FlightCard";

interface ResultsListProps {
  flights: Flight[];
  isLoading: boolean;
  error: Error | null;
}

export const ResultsList = ({ flights, isLoading, error }: ResultsListProps) => {
  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-600">Searching for the best flights...</p>
          </div>
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-red-50 p-6 rounded-lg text-center"
        >
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Failed to load flights. Please try again."}
          </p>
        </motion.div>
      ) : flights.length > 0 ? (
        <div className="space-y-4">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white p-8 rounded-lg text-center"
        >
          <p className="text-gray-600">No flights found for your search criteria.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
