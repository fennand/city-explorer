export default function LocationForm({ getLocation, handleChange }) {
  return (
    <form onSubmit={getLocation} className="locationForm">
      <label for="locationInput">Enter your location:</label>
      <input
        onChange={handleChange}
        type="text"
        name="locationInput"
        className="locationInput"
      />
      <button className="locationSubmit">Explore!</button>
    </form>
  );
}
