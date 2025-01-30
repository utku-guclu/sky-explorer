import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Flight } from "../../types/flight";

interface FlightDetailProps {
  flight: Flight | null;
  onClose: () => void;
}

export const FlightDetail = ({ flight, onClose }: FlightDetailProps) => {
  if (!flight) return null;

  return (
    <AnimatePresence>
      {flight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Flight Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Price Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price</span>
                  <span className="text-2xl font-bold">
                    {flight.price.formatted}
                  </span>
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-6">
                {flight.legs.map((leg, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {leg.origin.name} ({leg.origin.displayCode})
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(leg.departure).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {leg.destination.name} ({leg.destination.displayCode})
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(leg.arrival).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <img
                          src={leg.carriers.marketing[0].logoUrl}
                          alt={leg.carriers.marketing[0].name}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {leg.carriers.marketing[0].name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Duration: {leg.durationInMinutes} minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{leg.stopCount} stops</span>
                    </div>

                    {/* Segments */}
                    <div className="space-y-4">
                      {leg.segments.map((segment, segmentIndex) => (
                        <div key={segment.id} className="pl-4 border-l-2 border-gray-200">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {segment.origin.name} ({segment.origin.displayCode})
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(segment.departure).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {segment.destination.name} ({segment.destination.displayCode})
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(segment.arrival).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Flight {segment.flightNumber}</span>
                            <span>•</span>
                            <span>Operated by {segment.operatingCarrier.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {index < flight.legs.length - 1 && (
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-500">
                          Layover at {leg.destination.name}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fare Policy */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fare Policy</span>
                  <div className="text-sm text-gray-600">
                    {flight.farePolicy.isChangeAllowed && (
                      <p>Changes Allowed</p>
                    )}
                    {flight.farePolicy.isCancellationAllowed && (
                      <p>Cancellation Allowed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};