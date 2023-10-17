import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const SingleJob = () => {
  const [data, setData] = useState({
    title: '',
    companyName: '',
    createdAt: '',
    longDescription: '',
    shortDescription: '',
    status: '',
  });
  const [fetchError, setFetchError] = useState('');

  document.title = `HR Dashboard - ${data.title}`;

  const { t } = useTranslation();

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
      } catch {
        setFetchError('Something went wrong.');
      }
    };
    if (!token) {
      return;
    }
    fetchData();
  }, [token, auth, id]);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 mb-32 p-2">
      <h1 className="text-4xl">
        {t('SingleJob.Job')} {data.title}
      </h1>
      <p className="text-xl mt-10">
        {t('SingleJob.Company')} {data.companyName}
      </p>
      <p className="text-xl mt-2">
        {t('SingleJob.CreatedAt')} {data.createdAt.substring(0, 10)}{' '}
        {data.createdAt.substring(11, 16)}
      </p>
      <p className="text-xl mt-2">
        {t('SingleJob.Status')} {data.status}
      </p>
      <p className="text-xl mt-2">
        {t('SingleJob.Description')} {data.longDescription}
      </p>
    </div>
  );
};
