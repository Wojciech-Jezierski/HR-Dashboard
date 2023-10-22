import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import type { BlacklistCandidate } from '../../types/blacklistCandidate';

export const BlackList = () => {
  const [data, setData] = useState<BlacklistCandidate[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [typeOfSorting, setTypeOfSorting] = useState('name');
  const [order, setOrder] = useState('asc');
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState('');
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
    useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const { t } = useTranslation();

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = parseInt(event.target.value, 10);
    setItemsPerPage(selectedValue);
    setSkip(0);
    // Add your desired logic here
  };

  const handleTypeOfSortingChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = event.target.value;
    setTypeOfSorting(selectedValue);
    setSkip(0);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setOrder(selectedValue);
    setSkip(0);
  };

  const nextPageClick = () => {
    setSkip(skip + itemsPerPage);
  };

  const previousPageClick = () => {
    setSkip(skip - itemsPerPage);
  };

  useEffect(() => {
    if (skip !== 0) {
      setIsPreviousButtonDisabled(false);
    }

    if (skip === 0) {
      setIsPreviousButtonDisabled(true);
    }

    if (skip > count) {
      setIsNextButtonDisabled(true);
    }

    if (skip < count) {
      setIsNextButtonDisabled(false);
    }
  }, [skip, count]);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem('USER_TOKEN') ||
        sessionStorage.getItem('USER_TOKEN');
      const auth = `Bearer ${token}`;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blacklist/candidates?skip=${skip}&take=${itemsPerPage}&sortBy=${typeOfSorting}&order=${order}`,
          {
            headers: { Authorization: auth },
          },
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (errors) {
        setError(errors as string);
      }
    };

    fetchData();
  }, [itemsPerPage, typeOfSorting, order, skip]);

  if (!data) {
    return <div>...Loading</div>;
  }

  return (
    <div className="blacklist-content mt-20 relative">
      <div className="error">{error}</div>
      <div className="flex-end md:text-xl mb-5 text-slate-400">
        {t('Blacklist.Items')} {count}
      </div>
      <div className="flex">
        <label htmlFor="itemsPerPage" className="md:text-xl">
          {t('Blacklist.ItemsPerPage')}
          <select
            className="mb-2 md:mb-7 md:text-xl"
            id="itemsPerPage"
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
        <label htmlFor="typeOfSorting" className="md:text-xl ml-7">
          {t('Blacklist.TypeOfSorting')}
          <select
            className="mb-2 md:mb-7 md:text-xl"
            id="typeOfSorting"
            onChange={handleTypeOfSortingChange}
          >
            <option value="name">{t('Blacklist.ByName')}</option>
            <option value="reason">{t('Blacklist.ByReason')}</option>
          </select>
        </label>
        <label htmlFor="order" className="md:text-xl ml-7">
          {t('Blacklist.Order')}
          <select
            className="mb-2 md:mb-7 md:text-xl"
            id="order"
            onChange={handleOrderChange}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </label>
      </div>
      {data.length === 0 ? (
        <div className="error">{t('Blacklist.Error')}</div>
      ) : (
        <table className="border-collapse border">
          <thead>
            <tr>
              <th className="p-6 border">{t('Blacklist.Name')}</th>
              <th className="p-6 border">{t('Blacklist.Reason')}</th>
            </tr>
          </thead>
          {/* Map 'data' array to ReactNode elements */}
          <tbody>
            {data.map((item: BlacklistCandidate) => (
              <tr key={item.id}>
                {/* Render 'blacklistCandidate' properties here */}
                <th className="p-6 border font-normal">{item.name}</th>
                <th className="p-6 border font-normal">{item.reason}</th>
                {/* Add more properties as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="blacklist-left-arrow text-2xl absolute bottom-[-40px] left-1"
        onClick={previousPageClick}
        disabled={isPreviousButtonDisabled}
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        className="blacklist-right-arrow text-2xl absolute bottom-[-40px] right-1"
        onClick={nextPageClick}
        disabled={isNextButtonDisabled}
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};
