import { Polygon } from "react-leaflet";

const IntersectingTiles = ({ region }) => {
  return (
    <Polygon
      positions={region.map((coord) => [coord[1], coord[0]])}
      pathOptions={{
        color: "red",
        fillColor: "red",
        fillOpacity: 0.4,
      }}
    />
  );
};

export default IntersectingTiles;
