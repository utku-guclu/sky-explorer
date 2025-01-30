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

export interface Flight {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  farePolicy: {
    isChangeAllowed: boolean;
    isCancellationAllowed: boolean;
  }
  legs: FlightLeg[];
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
  origin: {
    id: string;
    displayCode: string;
    name: string;
  };
  destination: {
    id: string;
    displayCode: string;
    name: string;
  };
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
  segments: FlightSegment[];
}

export interface FlightSegment {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: {
    id: number;
    name: string;
    alternateId: string;
  };
  operatingCarrier: {
    id: number;
    name: string;
    alternateId: string;
  };
}

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string; // Format: YYYY-MM-DD
  returnDate?: string; // Optional, for round-trip flights
  adults: number;
  children?: number; // Optional
  infants?: number; // Optional
  currency?: string; // Default: USD
  market?: string; // Default: US
  locale?: string; // Default: en-US
  countryCode?: string; // Default: US
}