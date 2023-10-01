import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-bing-layer";
import useStyles from "./styles";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (
      mapContainer &&
      !map &&
      coordinates &&
      coordinates.lat !== undefined &&
      coordinates.lng !== undefined
    ) {
      const center = [coordinates.lat, coordinates.lng];
      const zoom = 15;

      const leafletMap = L.map("map").setView(center, zoom);
      setMap(leafletMap);

      // Add Bing Maps layer
      L.tileLayer
        .bing({
          bingMapsKey:
            "AvU7JKRIwvBO_KvAi3N4zVAMLJaeqIgVxxhH9zWmJKk6bULZ4LCiemtMiVQCCTXD",
          imagerySet: "Road",
        })
        .addTo(leafletMap);

      // Use the same custom icon for places and user's location
      const locationAndPlaceIcon = L.divIcon({
        className: "custom-place-icon",
        html: ReactDOMServer.renderToString(
          <LocationOnOutlined color="primary" fontSize="large" />
        ),
      });

      // Add a marker for the user's location
      L.marker([coordinates.lat, coordinates.lng], {
        icon: locationAndPlaceIcon,
      }).addTo(leafletMap);

      // Map over places and add markers with the same custom icon
      places?.forEach((place, i) => {
        const marker = L.marker([place.latitude, place.longitude], {
          icon: locationAndPlaceIcon,
        });

        marker.addTo(leafletMap).bindPopup(
          `<div>
            <strong>${place.name}</strong>
            <br />
            <img src="${
              place.photo
                ? place.photo.images.large.url
                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
            }" alt="${place.name}" style="width:100px; height: auto;" />
          </div>`
        );

        // Add click event handler for each marker
        marker.on('click', () => {
          setChildClicked(place);
        });
      });
    }
  }, [map, coordinates, places, setChildClicked]);

  return (
    <div
      id="map"
      className={classes.mapContainer}
      style={{ height: "400px", width: "100%" }}
    />
  );
};

export default Map;
