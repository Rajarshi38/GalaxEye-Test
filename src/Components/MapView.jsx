import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { startingPosition } from "../constants/constants";
import { latLngBounds, latLng } from "leaflet";
import predefinedDataset from "../data/karnataka.json";
import IntersectingTiles from "./IntersectingTiles";

const dataset = predefinedDataset.features.map(
  (feature) => feature.geometry.coordinates[0]
);

const MapView = () => {
  const [intersections, setIntersections] = useState([]);

  /**
   * onCreate handler for drawing the Area of Interest
   * @param {import("leaflet").DrawEvents.Created} event
   */
  const onCreatedHandler = (event) => {
    const { layer, layerType } = event;
    if (layerType === "polygon" || layerType === "circle") {
      const drawnBounds = layer.getBounds();
      const intersectingRegions = dataset.filter((regionCdnts) => {
        const latlangs = regionCdnts.map((coords) =>
          latLng(coords[1], coords[0])
        );
        const regionBounds = latLngBounds(latlangs);
        return regionBounds.intersects(drawnBounds);
      });

      setIntersections(intersectingRegions);
    }
  };

  return (
    <div className="mapview-container">
      <h1 className="mapview-container-header"> Intersect console</h1>
      <MapContainer center={startingPosition} zoom={6}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              circle: true,
              polygon: true,
              rectangle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
            onCreated={onCreatedHandler}
          />
          {/* Rendering the intersection areas within the map */}
          {intersections.map((region) => (
            <IntersectingTiles key={crypto.randomUUID()} region={region} />
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapView;
