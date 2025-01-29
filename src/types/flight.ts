export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    relevantFlightParams: {
      skyId: string;
      entityId: string;
    };
  };
}

export interface FlightResult {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
}

export interface FlightLeg {
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: Array<{
      name: string;
      logoUrl: string;
    }>;
  };
}