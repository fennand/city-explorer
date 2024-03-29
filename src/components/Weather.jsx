export default function RenderWeather({ weather }) {
  return (
    <>
      <h2>Current Weather:</h2>
      <div>
        {weather.map((data) => (
          <div key={data.date}>
            <div>
              <h4>{data.date}</h4>
              <h4>{data.description}</h4>
              <h4>Temp: {data.temp}*C</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
