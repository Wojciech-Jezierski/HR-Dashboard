import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9595/users/me', {
        headers: { Authorization: auth },
      });
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
    };
    fetchData();
  }, [token, auth]);

  return { firstName, lastName };
};
