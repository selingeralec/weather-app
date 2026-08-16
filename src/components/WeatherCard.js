import React from "react";
import WeatherIcon from "./WeatherIcon";

const WeatherCard = ({ weather, forecast, airQuality, units = "metric" }) => {
  if (!weather) return null;

  const { name, sys, main, weather: weatherData, wind } = weather;
  const { temp, feels_like, humidity, pressure } = main;
  const { description } = weatherData[0];

  // Dynamic unit symbols
  const tempSymbol = units === "metric" ? "°C" : "°F";
  const windSymbol = units === "metric" ? "m/s" : "mph";

  // Extract Air Quality metrics
  const aqi = airQuality?.current?.us_aqi;
  const uvIndex = airQuality?.current?.uv_index;

  const getAQILabel = (val) => {
    if (!val && val !== 0) return { label: "N/A", color: "text-gray-400" };
    if (val <= 50) return { label: "Good", color: "text-emerald-400" };
    if (val <= 100) return { label: "Moderate", color: "text-yellow-400" };
    if (val <= 150)
      return { label: "Unhealthy (Sensitive)", color: "text-orange-400" };
    return { label: "Unhealthy", color: "text-red-400" };
  };

  const aqiStatus = getAQILabel(aqi);

  return (
    <div className="w-full max-w-md lg:max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 lg:p-8 shadow-2xl text-white transition-all duration-300">
      {/* Main Grid: Stacks on mobile, 2 columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT COLUMN: Main Hero Weather Info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {name},{" "}
                <span className="text-white/70 font-medium">{sys.country}</span>
              </h2>
              <p className="text-white/80 capitalize text-sm mt-1">
                {description}
              </p>
            </div>
            <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <WeatherIcon condition={weatherData[0].main} size={48} />
            </div>
          </div>

          <div className="my-6 lg:my-8">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl lg:text-7xl font-extrabold tracking-tighter">
                {Math.round(temp)}°
              </span>
              <span className="text-2xl font-medium text-white/70">
                {tempSymbol}
              </span>
            </div>
            <p className="text-sm text-white/70 mt-1">
              Feels like{" "}
              <span className="font-semibold text-white">
                {Math.round(feels_like)}
                {tempSymbol}
              </span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">
              Air Quality
            </span>
            <span className={`text-sm font-bold ${aqiStatus.color}`}>
              {aqi ?? "--"} AQI ({aqiStatus.label})
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Metrics Grid & Forecast */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6">
          {/* Detailed Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">
                UV Index
              </span>
              <span className="text-lg font-bold mt-1 block">
                {uvIndex ?? "--"}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">
                Humidity
              </span>
              <span className="text-lg font-bold mt-1 block">{humidity}%</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">
                Wind
              </span>
              <span className="text-lg font-bold mt-1 block">
                {wind.speed} {windSymbol}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">
                Pressure
              </span>
              <span className="text-lg font-bold mt-1 block">
                {pressure} hPa
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl col-span-2 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">
                Visibility
              </span>
              <span className="text-lg font-bold mt-1 block">
                {weather.visibility / 1000} km
              </span>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {forecast && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-3">
                5-Day Forecast
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {forecast.list
                  .filter((_, i) => i % 8 === 0)
                  .slice(0, 5)
                  .map((day, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm border border-white/10 p-2.5 rounded-2xl flex flex-col items-center hover:bg-white/20 transition-all duration-200"
                    >
                      <p className="text-xs font-medium text-white/80">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>
                      <div className="my-1">
                        <WeatherIcon
                          condition={day.weather[0].main}
                          size={28}
                        />
                      </div>
                      <p className="text-xs font-bold">
                        {Math.round(day.main.temp)}°
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
