# Sky Explorer ✈️

A modern flight search application with real-time pricing, advanced filters, and sorting capabilities.

![App Preview](Sky.png) 

## Features

- **Flight Search**  
  Search for flights between airports with date selection
- **Real-time Pricing**  
  Get up-to-date flight prices and availability
- **Advanced Filters**  
  Filter by:
  - Number of stops (0-4)
  - Airlines
  - Price range
- **Smart Sorting**  
  Sort results by:
  - Price (Lowest first)
  - Duration (Shortest first)
  - Departure time (Earliest first)
  - Number of stops
- **Responsive Design**  
  Works seamlessly on desktop and mobile devices
- **Error Handling**  
  Graceful error states and loading indicators
- **Animated Transitions**  
  Smooth UI interactions powered by Framer Motion

## Technologies

- **Frontend**  
  ![React](https://img.shields.io/badge/React-18-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
  ![React Query](https://img.shields.io/badge/React_Query-4-red?logo=reactquery)
  ![Axios](https://img.shields.io/badge/Axios-1.6-green)
- **Styling**  
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwindcss)
- **Animation**  
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-blue)
- **Icons**  
  ![Lucide React](https://img.shields.io/badge/Lucide_React-0.3-lightgrey)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/utku-guclu/sky-explorer.git
cd sky-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create `.env` file in root directory:
```env
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.flight-service.com/v1
```

### 4. Run the development server
```bash
npm run dev
```

## Usage

### Search for flights
- Select origin and destination airports
- Choose travel dates
- Select number of passengers
- Choose trip type (Round-trip/One-way)

### Refine results
- Use filters in left sidebar:
  - Number of stops
  - Airlines
- Sort results using dropdown

### View flight details
- Click on flight cards to see:
  - Full itinerary details
  - Layover information
  - Aircraft type
  - Baggage policies

## API Reference

### Flight Search API

**Endpoint:** POST /flights/search

**Parameters:**
```json
{
  "originSkyId": "TYOA",
  "originEntityId": "27542089",
  "destinationSkyId": "IST",
  "destinationEntityId": "95673323",
  "date": "2025-01-30",
  "returnDate": "2025-02-10", // Optional
  "adults": 1
}
```

### Airport Search API

**Endpoint:** GET /airports/search?query=Tokyo

**Response:**
```json
{
  "data": [
    {
      "skyId": "TYOA",
      "entityId": "27542089",
      "presentation": {
        "title": "Tokyo (All Airports)",
        "subtitle": "Japan"
      }
    }
  ]
}
```

## Project Structure
```
/src
├── components/          # Reusable components
│   ├── flight/          # Flight-specific components
│   │   ├── SearchForm.tsx
│   │   ├── ResultsList.tsx
│   │   └── FilterControls.tsx
├── services/            # API service layer
│   └── api.ts           # Axios instance and API calls
├── types/               # TypeScript definitions
│   └── flight.ts        # Flight-related types
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/your-feature
```
3. Commit your changes:
```bash
git commit -m 'Add some feature'
```
4. Push to the branch:
```bash
git push origin feature/your-feature
```
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- Flight data provided by FlightAPI
- Icons by Lucide React