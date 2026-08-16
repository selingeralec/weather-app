import { useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAirQuality,
} from "../api/weather";

export const useWeather = (initialCity = "London") => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [city, setCity] = useState(initialCity);
  const [units, setUnits] = useState("metric"); // 'metric' (°C) or 'imperial' (°F)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (targetCity, targetUnits = units) => {
    setLoading(true);
    setError(null);
    try {
      const currentWeather = await fetchCurrentWeather(targetCity, targetUnits);
      setWeather(currentWeather);

      const { lat, lon } = currentWeather.coord;
      const [forecastData, aqData] = await Promise.all([
        fetchForecast(lat, lon, targetUnits),
        fetchAirQuality(lat, lon),
      ]);

      setForecast(forecastData);
      setAirQuality(aqData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(city, units);
  }, [units]);

  const searchWeather = (newCity) => {
    setCity(newCity);
    getWeather(newCity, units);
  };

  const toggleUnits = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return {
    weather,
    forecast,
    airQuality,
    loading,
    error,
    city,
    units,
    toggleUnits,
    searchWeather,
  };
};
