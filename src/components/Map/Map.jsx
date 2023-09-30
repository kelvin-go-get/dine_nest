import React from 'react';
import useStyles from './styles'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import TrueWayGeocodingAPI from '../../api/index'

const Map = ({setCoordinates, setBounds, coordinates}) => {
  const classes = useStyles ();
  const isMobile = useMediaQuery ('(min-width:600px)');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TrueWayGeocodingAPI();
        console.log(data);
        // Handle data if needed
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      
      // bootstrapURLKeys={{ key: ''}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
      options={''}
      onChange={(e) => {
        setCoordinates ({ lat: e.center.lat, lng: e.center.lng })
        setBounds ({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
      }}
      onChildClick={''}

      >

      </GoogleMapReact>
    </div>
  )
}

export default Map