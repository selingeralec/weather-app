import React from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const {
    weather,
    forecast,
    airQuality,
    loading,
    error,
    units,
    toggleUnits,
    searchWeather,
  } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 flex flex-col items-center justify-start sm:justify-center p-4 lg:p-12">
      {/* App Container */}
      <div className="w-full max-w-md lg:max-w-4xl mx-auto space-y-6">
        {/* Top Header Row: Title & Unit Toggle */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            How’s the Weather?
          </h1>

          {/* Unit Toggle Switch */}
          <button
            onClick={toggleUnits}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-semibold backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-1.5 text-sm sm:text-base shadow-lg cursor-pointer"
          >
            <span
              className={
                units === "metric" ? "text-white font-bold" : "text-white/40"
              }
            >
              °C
            </span>
            <span className="text-white/30">|</span>
            <span
              className={
                units === "imperial" ? "text-white font-bold" : "text-white/40"
              }
            >
              °F
            </span>
          </button>
        </div>

        {/* Full-Width SearchBar Container */}
        <div className="w-full">
          <SearchBar onSearch={searchWeather} />
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="text-white/80 text-center text-sm sm:text-base animate-pulse">
            Fetching latest weather...
          </div>
        )}
        {error && (
          <div className="text-red-200 bg-red-500/20 text-center px-4 py-2.5 rounded-2xl border border-red-500/30 text-sm">
            {error}
          </div>
        )}

        {/* Main Weather Card */}
        <WeatherCard
          weather={weather}
          forecast={forecast}
          airQuality={airQuality}
          units={units}
        />
      </div>
    </div>
  );
}

export default App;
