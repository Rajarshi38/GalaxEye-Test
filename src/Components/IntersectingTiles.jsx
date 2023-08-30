import { Pane, Polygon, Popup } from "react-leaflet";

const IntersectingTiles = ({ region }) => {
  return (
    <Pane
      style={{
        zIndex: -10,
      }}
    >
      <Polygon
        positions={region.map((coord) => [coord[1], coord[0]])}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.4,
          fillRule: "evenodd",
        }}
      >
        <Popup>This is a intersecting tile</Popup>
      </Polygon>
    </Pane>
  );
};

export default IntersectingTiles;
