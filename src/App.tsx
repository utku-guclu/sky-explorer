import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FlightSearchPage } from './pages/FlightSearchPage';

// Create a React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <h1 className="text-3xl font-bold text-indigo-600">Flight Search</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <FlightSearchPage />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;