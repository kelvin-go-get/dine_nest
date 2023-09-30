import React from "react";
import useStyles from './style.jsx';
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"

const Header = () => {
  const classes = useStyles ();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Dine Nest
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore Kenya
          </Typography>
          {/* <Autocomplete> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
                
              </div>
            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput}}/>

            </div>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
