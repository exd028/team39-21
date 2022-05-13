import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const response = await axios.get(
      'https://travel-advisor.p.rapidapi.com/' + type + '/list-in-boundary',
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': 'd0d4a5b593msh16d76dcd66c5ad5p1b56bajsn5705dbfb929f',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
