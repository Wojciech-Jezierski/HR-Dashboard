import { useState, useEffect } from 'react';
import axios from 'axios';

export const SingleCandidate = () => {
  const [data, setData] = useState({
    name: '',
    createdAt: '',
    position: '',
  });
  const [fetchError, setFetchError] = useState(null);

  document.title = `HR Dashboard - ${data.name}`;

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/candidates/${id} `,
          {
            headers: { Authorization: auth },
          },
        );
        setData({
          name: response.data.name,
          createdAt: response.data.createdAt,
          position: response.data.position,
        });
      } catch (error: any) {
        setFetchError(error.message);
      }
    };
    if (!token) {
      return;
    }
    fetchData();
  }, []);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 mb-32 p-2">
      <h1 className="text-4xl">User: {data.name}</h1>
      <p className="text-xl mt-2">
        Created at: {data.createdAt.substring(0, 10)}{' '}
        {data.createdAt.substring(11, 16)}
      </p>
      <p className="text-xl mt-2">Position: {data.position}</p>
    </div>
  );
};
