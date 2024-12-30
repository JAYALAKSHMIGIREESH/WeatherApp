import React, { useState } from 'react';
import './style.css'
import search_icon from '../src/assets/search.png';
import clear_icon from '../src/assets/clear.png';
import humidity_icon from '../src/assets/humidity.png';
import axios from 'axios';
import wind_icon from '../src/assets/wind.png';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = '220975902c4048f922c91465510d22b4';

  const fetchWeather = async () => {
    if (!city) {  
      alert("Please enter a valid city name");
      return;
    }
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      alert("City not found. Please enter a valid city name.");
    }
  };
  

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className='weather'>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button style={{border:'none',borderRadius:'50%',width:'50px',height:'50px'}} type="submit">
          <img src={search_icon} alt="Search" />
        </button>
      </form>

      {weather && (
        <div>
          <img  src={clear_icon} alt="Weather Icon" className='weather-icon' />
          <p className='location'>{weather.name}</p>
          <p className='temperature'>{weather.main.temp}°C</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weather.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weather.wind.speed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;     