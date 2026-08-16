import React from "react";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiNightClear,
} from "react-icons/wi";

const WeatherIcon = ({ condition, size = 64 }) => {
  const getIcon = () => {
    switch (condition) {
      case "Clear":
        return (
          <WiDaySunny size={size} className="text-amber-300 drop-shadow-md" />
        );
      case "Rain":
        return <WiRain size={size} className="text-sky-300 drop-shadow-md" />;
      case "Clouds":
        return (
          <WiCloudy size={size} className="text-slate-200 drop-shadow-md" />
        );
      case "Snow":
        return <WiSnow size={size} className="text-cyan-200 drop-shadow-md" />;
      case "Thunderstorm":
        return (
          <WiThunderstorm
            size={size}
            className="text-purple-300 drop-shadow-md"
          />
        );
      case "Fog":
      case "Mist":
        return <WiFog size={size} className="text-slate-300 drop-shadow-md" />;
      case "Drizzle":
        return <WiRain size={size} className="text-sky-200 drop-shadow-md" />;
      case "Night":
        return (
          <WiNightClear
            size={size}
            className="text-indigo-200 drop-shadow-md"
          />
        );
      default:
        return (
          <WiDayCloudy size={size} className="text-amber-200 drop-shadow-md" />
        );
    }
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
};

export default WeatherIcon;
