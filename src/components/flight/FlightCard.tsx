import { motion } from 'framer-motion';
import { Flight, FlightLeg, FlightSegment } from '../../types/flight';

interface FlightCardProps {
    flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-blue-600">
                        {flight.price.formatted}
                    </h3>
                    <div className="flex items-center mt-1">
                        <img
                            src={flight.legs[0].carriers.marketing[0].logoUrl}
                            alt={flight.legs[0].carriers.marketing[0].name}
                            className="w-6 h-6 mr-2"
                        />
                        <span className="text-gray-600">
                            {flight.legs[0].carriers.marketing[0].name}
                        </span>
                    </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {flight.legs[0].stopCount} stop{flight.legs[0].stopCount !== 1 && 's'}
                </span>
            </div>

            <div className="space-y-4">
                {flight.legs.flatMap((leg: FlightLeg, legIndex: number) =>
                    leg.segments.map((segment: FlightSegment, segmentIndex: number) => (
                        <div key={`${legIndex}-${segmentIndex}`} className="flex justify-between items-center">
                            <div className="text-center">
                                <p className="font-semibold">
                                    {new Date(segment.departure).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500">{segment.origin.displayCode}</p>
                            </div>

                            <div className="mx-4 text-center">
                                <p className="text-sm text-gray-500">
                                    {formatDuration(segment.durationInMinutes)}
                                </p>
                                <div className="h-px bg-gray-200 w-16 my-1" />
                                <p className="text-xs text-gray-500">
                                    {segment.marketingCarrier.alternateId} {segment.flightNumber}
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="font-semibold">
                                    {new Date(segment.arrival).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500">{segment.destination.displayCode}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    {flight.farePolicy?.isChangeAllowed ? 'Changes allowed' : 'No changes'}
                    {' • '}
                    {flight.farePolicy?.isCancellationAllowed ? 'Refundable' : 'Non-refundable'}
                </p>
            </div>
        </motion.div>
    );
};