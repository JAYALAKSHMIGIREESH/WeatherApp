import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      setWeather(data);
      setError('');
    } else {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-details">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
