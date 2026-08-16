# Weather & Air Quality Dashboard

A modern, responsive weather web application built with **React 19**, **Tailwind CSS v4**, and **OpenWeather API**. Includes real-time weather metrics, search autocomplete, air quality indices, and unit conversion.

---

## ✨ Features

- 🌤️ **Live Weather & 5-Day Forecast:** Detailed current temperature, feels-like temperature, humidity, wind speed, pressure, and visibility.
- 🍃 **Air Quality & UV Index:** Real-time AQI and UV monitoring via Open-Meteo API.
- 🔍 **Search Autocomplete:** Smart location suggestions with country tags as you type.
- 🌡️ **Dynamic Unit Toggle:** Switch seamlessly between Celsius (`°C`) and Fahrenheit (`°F`).
- 🎨 **Sleek Glassmorphic UI:** Modern translucent design built with Tailwind CSS v4.
- 📱 **Fully Responsive:** Multi-column layout optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Icons
- **Styling:** Tailwind CSS v4
- **APIs:**
  - OpenWeatherMap API — Current weather & 5-day forecast
  - Open-Meteo Air Quality API — AQI and UV Index
  - Open-Meteo Geocoding API — City search autocomplete
- **Testing:** React Testing Library, Jest

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   git clone https://github.com/selingeralec/weather-app.git
   cd weather-app

2. Install dependencies:
   npm install

3. Configure Environment Variables:
   Create a .env file in the root directory and add your OpenWeather API key:
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key_here

   Note: You can get a free API key at OpenWeatherMap.

4. Start the development server:
   npm start

   Open http://localhost:3000 to view it in your browser.

---

## 🧪 Testing

Run the automated test suite with Jest and React Testing Library:

npm test

---

## 📄 License

This project is open source and available under the MIT License.
