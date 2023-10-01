import React, { useEffect, useState } from "react";
import { getPlacesData } from "./api";
import { Grid, CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const fetchGeolocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  };

  useEffect(() => {
    fetchGeolocation(); // Invoke it immediately

    // Optionally, you can add cleanup logic here if needed.
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      // Assuming you want to set bounds around the current location
      const sw = { lat: coordinates.lat - 0.1, lng: coordinates.lng - 0.1 };
      const ne = { lat: coordinates.lat + 0.1, lng: coordinates.lng + 0.1 };
      setBounds({ sw, ne });
    }
  }, [coordinates]);

  useEffect(() => {
    const placesBounds = {
      sw: { lat: coordinates.lat - 0.2, lng: coordinates.lng - 0.2 },
      ne: { lat: coordinates.lat + 0.2, lng: coordinates.lng + 0.2 },
    };

    console.log("Places Bounds:", placesBounds);

    if (placesBounds && placesBounds.sw && placesBounds.ne) {
      getPlacesData(placesBounds.sw, placesBounds.ne)
        .then((data) => {
          console.log("Places data:", data);
          setPlaces(data);
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
        });
    }
  }, [coordinates]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
