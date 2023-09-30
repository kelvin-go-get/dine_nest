import axios  from "axios";


const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const options = {
    params: {
      bl_latitude: '-4.6768',
      tr_latitude: '5.0198',
      bl_longitude: '33.9046',
      tr_longitude: '41.8991',
    },
    headers: {
      'X-RapidAPI-Key': 'f32070c4bbmshe71b2e9a2f1637fp17e3f2jsn9a280a1ba601',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };


export const getPlacesData = async () => {
    try {
        const { data: {data}} = await axios.get(URL, options);

        return data;

    } catch (error) {
        console.log(error)
    }
}


const geocodingApi = async () => {
    const options = {
      method: 'GET',
      url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
      params: {
        location: '-1.2921,36.8219',
        language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': 'f32070c4bbmshe71b2e9a2f1637fp17e3f2jsn9a280a1ba601',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export default geocodingApi;

