import React, { useState, useEffect } from "react";
import sunny from "./images/sunny.jpg";
import cloudy from "./images/cloudy.jpg";
import rainy from "./images/rainy.jpg";
import snow from "./images/snow.jpg";
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("F");
  const [background, setBackground] = useState(sunny);

  useEffect(() => {
    if (weatherData.current) {
      switch (weatherData.current.condition.text) {
        case "Sunny":
          setBackground(sunny);
          break;
        case "Overcast":
          setBackground(cloudy);
          break;
        case "Cloudy":
          setBackground(cloudy);
          break;
        case "Rainy":
          setBackground(rainy);
          break;
        case "Light rain":
          setBackground(rainy);
          break;
        case "Snowy":
          setBackground(snow);
          break;
        default:
          setBackground(sunny);
          break;
      }
    }
  }, [weatherData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_KEY = "0fa46bd365d64f9e9ef121140231302";
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (error) {
      setError("An error occurred while fetching the weather data");
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "F" ? "C" : "F");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
          <h1>Don't look outside!</h1>
    <h2>check current weather online</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData.current && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            
          }}
        >
          <p>
            {weatherData.location.name}, {weatherData.location.country}
          </p>
          <p>
            {unit ==="F"
          ? weatherData.current.temp_f + "°F"
          : weatherData.current.temp_c + "°C"}{" "}
          ({weatherData.current.condition.text})
          <img src={weatherData.current.condition.icon}/>
          </p>
          <button onClick={toggleUnit}>
          Switch to {unit === "F" ? "Celsius" : "Fahrenheit"}
          </button>
          </div>
          )}
          </div>
          );
          };

export default App;