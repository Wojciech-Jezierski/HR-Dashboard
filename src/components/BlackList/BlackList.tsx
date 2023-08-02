import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { blacklistCandidate } from '../../types/blacklistCandidate';

export const BlackList = () => {
  const [data, setData] = useState<blacklistCandidate[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [typeOfSorting, setTypeOfSorting] = useState('name');
  const [order, setOrder] = useState('asc');
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState('');
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
    useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const handleItemsPerPageChange = (event: any) => {
    const selectedValue = parseInt(event.target.value, 10);
    setItemsPerPage(selectedValue);
    setSkip(0);
    console.log('Items per page changed:', selectedValue);
    // Add your desired logic here
  };

  const handleTypeOfSortingChange = (event: any) => {
    const selectedValue = event.target.value;
    setTypeOfSorting(selectedValue);
    setSkip(0);
  };

  const handleOrderChange = (event: any) => {
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
  }, [skip]);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem('USER_TOKEN') ||
        sessionStorage.getItem('USER_TOKEN');
      const auth = `Bearer ${token}`;
      try {
        const response = await axios.get(
          `http://localhost:9595/blacklist/candidates?skip=${skip}&take=${itemsPerPage}&sortBy=${typeOfSorting}&order=${order}`,
          {
            headers: { Authorization: auth },
          },
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (errors) {
        console.log(errors);
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
        Items: {count}
      </div>
      <div className="flex">
        <label htmlFor="itemsPerPage" className="md:text-xl">
          Items per page:
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
          Type of sorting:
          <select
            className="mb-2 md:mb-7 md:text-xl"
            id="typeOfSorting"
            onChange={handleTypeOfSortingChange}
          >
            <option value="name">By name</option>
            <option value="reason">By reason</option>
          </select>
        </label>
        <label htmlFor="order" className="md:text-xl ml-7">
          Order:
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
        <div className="error">No data found</div>
      ) : (
        <table className="border-collapse border">
          <thead>
            <tr>
              <th className="p-6 border">Name:</th>
              <th className="p-6 border">Reason:</th>
            </tr>
          </thead>
          {/* Map 'data' array to ReactNode elements */}
          <tbody>
            {data.map((item: blacklistCandidate) => (
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
        className="text-2xl absolute bottom-[-40px] left-1"
        onClick={previousPageClick}
        disabled={isPreviousButtonDisabled}
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        className="text-2xl absolute bottom-[-40px] right-1"
        onClick={nextPageClick}
        disabled={isNextButtonDisabled}
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};
