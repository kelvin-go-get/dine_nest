import React, { useState } from "react";
import useStyles from "./style";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    try {
      // Make a request to the Bing Maps API to geocode the search input
      const apiKey = "AvU7JKRIwvBO_KvAi3N4zVAMLJaeqIgVxxhH9zWmJKk6bULZ4LCiemtMiVQCCTXD";
      const response = await fetch(
        `https://dev.virtualearth.net/REST/v1/Locations?q=${searchInput}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();

      // Extract coordinates from the API response
      const coordinates =
        data?.resourceSets?.[0]?.resources?.[0]?.point?.coordinates;

      if (coordinates) {
        const [lng, lat] = coordinates;
        setCoordinates({ lat, lng });
      } else {
        console.error("No coordinates found");
      }
    } catch (error) {
      console.error("Error in Search:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Dine Nest
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Discover Globe
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
