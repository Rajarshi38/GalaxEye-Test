import { useState, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
window.type = true;
import { startingPosition } from "../constants/constants";
import { latLngBounds, latLng } from "leaflet";
import predefinedDataset from "../data/karnataka.json";
import IntersectingTiles from "./IntersectingTiles";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useIntersections } from "../hooks/useIntersections";

// mapping only the coordinates to an array
const dataset = predefinedDataset.features.map(
  (feature) => feature.geometry.coordinates[0]
);

const MapView = () => {
  const { intersections, setIntersections } = useIntersections();
  const [map, setMap] = useState(null);
  const isDesktop = useMediaQuery("(min-width : 720px)");

  /**
   * onCreate handler for drawing the Area of Interest
   * @param {import("leaflet").DrawEvents.Created} event
   */
  const onCreatedHandler = (event) => {
    const { layer, layerType } = event;
    layer.bindPopup("Area of Interest").openPopup();
    if (
      layerType === "polygon" ||
      layerType === "circle" ||
      layerType === "rectangle"
    ) {
      const drawnBounds = layer.getBounds();
      const intersectingRegions = dataset.filter((region_coordinates) => {
        const latlangs = region_coordinates.map((coords) =>
          latLng(coords[1], coords[0])
        );
        const regionBounds = latLngBounds(latlangs);
        return regionBounds.intersects(drawnBounds);
      });

      setIntersections((prev) => [...(prev || []), ...intersectingRegions]);
    }
  };

  useEffect(() => {
    if (!map) return;
    if (isDesktop) map.setZoom(6);
    else map.setZoom(5);
  }, [map, isDesktop]);

  return (
    <MapContainer center={startingPosition} zoom={6} ref={setMap}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            circle: true,
            polygon: true,
            rectangle: true,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
          onCreated={onCreatedHandler}
          onDeleted={() => setIntersections(null)}
        />
        {/* Rendering the intersection areas within the map */}
        {intersections &&
          intersections.length > 0 &&
          intersections.map((region) => (
            <IntersectingTiles key={crypto.randomUUID()} region={region} />
          ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapView;
