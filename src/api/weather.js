const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city, units = "metric") => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`,
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchForecast = async (lat, lon, units = "metric") => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`,
  );
  if (!response.ok) throw new Error("Forecast unavailable");
  return response.json();
};

// Add to your api/weather.js
export const fetchAirQuality = async (lat, lon) => {
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,uv_index`,
  );
  if (!response.ok) throw new Error("Air quality data unavailable");
  return response.json();
};

// Fetch city suggestions as the user types in SearchBar
export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
  );
  const data = await response.json();
  return data.results || [];
};
