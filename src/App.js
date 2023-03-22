import Map from "./Map"
export default function App() {
  return (
    <Map options={{
      center: [37.4950926, 126.8622169],
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: 'TOP_RIGHT',
      mapTypeControl: true
    }}></Map>
  );
}

