import axios from 'axios';

export const getCandidates = async (auth) => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/candidates`, {
    headers: { Authorization: auth },
  });
  return result.data;
};

export const deleteItem = async (itemId, auth) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/jobs/${itemId}`,
        {
          method: 'DELETE',
          headers: { Authorization: auth },
        },
      );
  
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: 'Failed to delete item' };
      }
    } catch (error) {
      return { success: false, error: 'Error occurred while deleting item', details: error };
    }
  };

  export const deleteSelectedItems = async (data, auth) => {
    const selectedItem = data
      .filter((item) => item.select === true)
      .map((item) => item.id);
  
    try {
      await Promise.all(
        selectedItem.map((id) =>
          axios.delete(`${process.env.REACT_APP_API_URL}/${id}`, {
            headers: { Authorization: auth },
          })
        )
      );
  
      const updatedData = data.filter((item) => item.select === undefined);
      return updatedData;
    } catch (error) {
      throw new Error(error);
    }
  };

  export const getCandidateById = async (id, auth) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidates/${id}`, {
        headers: { Authorization: auth },
      });
  
      return {
        name: response.data.name,
        position: response.data.position,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
