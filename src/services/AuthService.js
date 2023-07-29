import axios from 'axios';

export async function refreshAuthToken(refToken, isChecked) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
        refreshToken: refToken,
      });
  
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
  
      if (isChecked === true) {
        localStorage.setItem('USER_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
      } if(isChecked === false) {
        sessionStorage.setItem('USER_TOKEN', accessToken);
        sessionStorage.setItem('REFRESH_TOKEN', refreshToken);
      }
  
      return accessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }