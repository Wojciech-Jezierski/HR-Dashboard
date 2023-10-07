import { useState, useEffect } from 'react';
import axios from 'axios';

export const SingleJob = () => {
  const [data, setData] = useState({
    title: '',
    companyName: '',
    createdAt: '',
    longDescription: '',
    shortDescription: '',
    status: '',
  });
  const [fetchError, setFetchError] = useState(null);

  document.title = `HR Dashboard - ${data.title}`;

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/jobs/${id} `,
          {
            headers: { Authorization: auth },
          },
        );
        setData({
          title: response.data.title,
          companyName: response.data.companyName,
          createdAt: response.data.createdAt,
          shortDescription: response.data.shortDescription,
          longDescription: response.data.longDescription,
          status: response.data.status,
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
      <h1 className="text-4xl">Job: {data.title}</h1>
      <p className="text-xl mt-10">Company: {data.companyName}</p>
      <p className="text-xl mt-2">
        Created at: {data.createdAt.substring(0, 10)}{' '}
        {data.createdAt.substring(11, 16)}
      </p>
      <p className="text-xl mt-2">Status: {data.status}</p>
      <p className="text-xl mt-2">Description: {data.longDescription}</p>
    </div>
  );
};
