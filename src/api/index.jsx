import axios  from "axios";


const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';




export const getPlacesData = async (sw, ne) => {
    try {
        const { data: {data}} = await axios.get(URL, {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': 'f32070c4bbmshe71b2e9a2f1637fp17e3f2jsn9a280a1ba601',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        
        return data;

    } catch (error) {
        console.log(error)
    }
}

