import React, { useState, useEffect, useRef } from "react";
import { fetchCitySuggestions } from "../api/weather";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch suggestions with a short delay (debounce)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input.trim().length >= 2) {
        const results = await fetchCitySuggestions(input);
        setSuggestions(results);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityName) => {
    onSearch(cityName);
    setInput("");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city..."
          className="flex-1 px-4 py-2.5 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-white/20 text-white font-medium rounded-2xl hover:bg-white/30 transition backdrop-blur-md border border-white/20"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-14 bg-slate-900/90 border border-white/10 rounded-2xl shadow-xl backdrop-blur-lg overflow-hidden z-50 text-white divide-y divide-white/5">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.name)}
              className="px-4 py-2.5 hover:bg-white/10 cursor-pointer flex justify-between items-center text-sm transition"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-white/50 text-xs">
                {item.admin1 ? `${item.admin1}, ` : ""}
                {item.country_code?.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
