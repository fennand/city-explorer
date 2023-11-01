import "./App.css";
import LocationForm from "./components/LocationForm";
import { useState } from "react";
import axios from "axios";
import RenderWeather from "./components/Weather";

const API_KEY = import.meta.env.VITE_API_KEY;
const WEATHER_KEY = import.meta.env.WEATHER_API_KEY;
const MOVIE_KEY = import.meta.end.MOVIE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState({});
  const [number, setNumber] = useState(10);
  const [weather, setWeather] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;
    const res = await axios.get(API);

    setLocation(res.data[0]);
    getWeather(res.data[0]);
  }

  async function getWeather(tempLocation) {
    const API = `http://localhost:8080/weather?key=${WEATHER_KEY}&lat=${tempLocation.lat}&lon=${tempLocation.lon}&searchQuery=${search}`;
    const res = await axios.get(API);
    setWeather(res.data);
  }

  function handleNumber(mod) {
    setNumber(number + mod);
  }

  return (
    <div className="centre">
      <h1>City Explorer</h1>
      <LocationForm getLocation={getLocation} handleChange={handleChange} />
      <h2>{location.display_name}</h2>
      <h2>
        Latitude: {location.lat}, Longitude: {location.lon}
      </h2>
      {location.lat && (
        <div>
          <button onClick={() => handleNumber(-1)}>-</button>
          <span>{number}</span>
          <button onClick={() => handleNumber(1)}>+</button>
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${number}&format=png`}
            alt="location map"
          />
        </div>
      )}
      <h2>{location.display_name}</h2>
      {weather.map((day) => {
        return (
          <p key={day.date}>
            The weather on {day.date} is {day.description}
          </p>
        );
      })}
      <RenderWeather weather={weather} />
    </div>
  );
}

export default App;
