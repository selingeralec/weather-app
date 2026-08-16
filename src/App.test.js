import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Helper mock responses
const mockWeatherResponse = {
  name: "London",
  sys: { country: "GB" },
  coord: { lat: 51.5074, lon: -0.1278 },
  main: { temp: 15, feels_like: 14, humidity: 70, pressure: 1015 },
  weather: [{ main: "Clouds", description: "overcast clouds" }],
  wind: { speed: 4.1 },
  visibility: 10000,
};

const mockForecastResponse = {
  list: Array(40).fill({
    dt: 1700000000,
    main: { temp: 14 },
    weather: [{ main: "Clouds" }],
  }),
};

const mockAirQualityResponse = {
  current: {
    us_aqi: 35,
    uv_index: 3,
  },
};

describe("Weather App", () => {
  beforeEach(() => {
    // Reset and setup global fetch mock before each test
    global.fetch = jest.fn((url) => {
      if (url.includes("/weather")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherResponse),
        });
      }
      if (url.includes("/forecast")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockForecastResponse),
        });
      }
      if (url.includes("air-quality")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAirQualityResponse),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders header title and search input", async () => {
    render(<App />);

    // Header rendering check
    expect(screen.getByText(/How’s the Weather?/i)).toBeInTheDocument();

    // Input placeholder check
    expect(screen.getByPlaceholderText(/search city/i)).toBeInTheDocument();

    // Wait for initial fetch to settle so no memory leaks occur
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test("fetches weather when user searches for a city", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/search city/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    // Simulate typing "Tokyo"
    fireEvent.change(input, { target: { value: "Tokyo" } });
    fireEvent.click(searchButton);

    // Verify OpenWeather was called with Tokyo
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=Tokyo"),
      );
    });
  });

  test("toggles unit display from C to F", async () => {
    render(<App />);

    const toggleBtn = screen.getByRole("button", { name: /°C|°F/i });
    expect(toggleBtn).toBeInTheDocument();

    // Click toggle button
    fireEvent.click(toggleBtn);

    // Verify units updated
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("units=imperial"),
      );
    });
  });
});
