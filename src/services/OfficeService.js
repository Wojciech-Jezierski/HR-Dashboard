import axios from 'axios';

export const getOffices = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/49eda68d-f26d-4b2c-80a9-1dd88f305a4b');
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
