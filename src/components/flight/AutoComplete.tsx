import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Airport } from '../../types/flight';
import { FlightService } from '../../services/api';

interface AutocompleteProps {
  label: string;
  placeholder: string;
  selected: Airport | null;
  onSelect: (airport: Airport) => void;
  icon?: React.ReactNode;
}

export const Autocomplete = ({
  label,
  placeholder,
  selected,
  onSelect,
  icon = <MapPin className="w-5 h-5" />
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selected) {
      setInputValue(selected.presentation.title);
    }
  }, [selected]);

  useEffect(() => {
    const search = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await FlightService.searchAirports(inputValue);
        setSuggestions(results);
      } catch (error) {
        console.error('Airport search failed:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">
          {icon}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onClick={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {suggestions.map((airport) => (
              <div
                key={airport.entityId}
                onClick={() => {
                  onSelect(airport);
                  setShowSuggestions(false);
                }}
                className="p-4 hover:bg-indigo-50 cursor-pointer transition-colors border-b last:border-b-0"
              >
                <div className="font-medium text-gray-900">{airport.presentation.title}</div>
                <div className="text-sm text-gray-500">{airport.presentation.subtitle}</div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};