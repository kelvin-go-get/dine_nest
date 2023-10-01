// App.js
import React, { useEffect, useState } from "react";
import { getPlacesData } from "./api";
import { debounce } from 'lodash';
import { Grid, CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState({});
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const fetchGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        // Handle the error or provide a user-friendly message
      }
    );
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      const sw = { lat: coordinates.lat - 0.1, lng: coordinates.lng - 0.1 };
      const ne = { lat: coordinates.lat + 0.1, lng: coordinates.lng + 0.1 };
      setBounds({ sw, ne });
    }
  }, [coordinates]);

  useEffect(() => {
const filteredPlaces = places.filter((place) => place.rating > rating);
setFilteredPlaces(filteredPlaces)

  }, [rating])

  useEffect(() => {
    const fetchPlacesDebounced = debounce(() => {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
          setIsLoading(false);
        });
    }, 500);

    if (bounds.sw && bounds.ne) {
      fetchPlacesDebounced();
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
