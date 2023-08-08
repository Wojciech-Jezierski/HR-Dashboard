import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import './Meetings.css';

import { Meeting } from '../../types/meeting';
import { AddMeeting } from '../AddMeeting/AddMeeting';

export const Meetings = () => {
  const [data, setData] = useState<Meeting[]>([]);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2023);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    date: '',
    candidate: '',
    title: '',
    place: '',
  });
  const [deleteItem, setDeleteItem] = useState('');
  const [isOpenDeleteWindow, setIsOpenDeleteWindow] = useState(false);
  const [isOpenAddWindow, setIsOpenAddWindow] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem('USER_TOKEN') ||
      sessionStorage.getItem('USER_TOKEN');
    const auth = `Bearer ${token}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/meetings?month=${month}&year=${year}`,
          {
            headers: { Authorization: auth },
          },
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(data);
  }, [month]);

  const handleDelete = async (itemId: string) => {
    const token =
      localStorage.getItem('USER_TOKEN') ||
      sessionStorage.getItem('USER_TOKEN');
    const auth = `Bearer ${token}`;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/meetings/${itemId}`,
        {
          headers: { Authorization: auth },
        },
      );
      console.log(`Item ${itemId} was deleted`);
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
      setIsOpenDeleteWindow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openInformationWindow = (
    id: any,
    date: any,
    candidate: any,
    title: any,
    place: any,
  ) => {
    setIsOpenWindow(!isOpenWindow);
    setSelectedItem({ id, date, candidate, title, place });
  };

  const closeInformationWindow = () => {
    setIsOpenWindow(false);
  };

  const openDeleteWindow = (id: any) => {
    setIsOpenDeleteWindow(!isOpenDeleteWindow);
    setDeleteItem(id);
  };

  const openAddMeetingWindow = () => {
    setIsOpenAddWindow(!isOpenAddWindow);
  };

  const nextMonth = () => {
    if (month >= 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const previousMonth = () => {
    if (month <= 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  useEffect(() => {
    if (year === 2022 && month < 2) {
      setIsDisabled(true);
    }

    if (month > 1) {
      setIsDisabled(false);
    }
  }, [month]);

  function getMonthName(months: number) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[months - 1];
  }

  const monthName = getMonthName(month);

  return (
    <div className="meetings-content mt-24 relative">
      <div className="flex justify-center">
        <div className="absolute top-[-50px] right-0">
          <button onClick={openAddMeetingWindow}>Add Meeting</button>
        </div>
        <button
          className="text-xl"
          onClick={previousMonth}
          disabled={isDisabled}
        >
          <AiOutlineArrowLeft />
        </button>
        <button className="ml-5 text-xl mr-8" onClick={nextMonth}>
          <AiOutlineArrowRight />
        </button>
        <div className="min-w-[160px]">
          <p className="text-xl">
            <span>{monthName}</span>
            <span className="ml-3">{year}</span>
          </p>
        </div>
      </div>
      <div className="mt-10 text-center">
        {data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id}>
              <div className="flex border relative">
                <p className="md:text-xl p-5">{item.date.substring(0, 10)}</p>
                <p className="md:text-xl p-5 ml-5">
                  {item.date.substring(11, 16)}
                </p>
                <p className="md:text-xl p-5 ml-2">Meeting with:</p>
                <p className="md:text-xl pt-5 mr-20">{item.candidate.name}</p>
                <button
                  className="md:text-xl absolute top-5 right-10 bg-yellow-300 rounded-xl"
                  onClick={() =>
                    openInformationWindow(
                      item.id,
                      item.date,
                      item.candidate.name,
                      item.job.title,
                      item.place,
                    )
                  }
                >
                  (i)
                </button>
                <button
                  className="md:text-xl absolute top-6 right-2"
                  onClick={() => {
                    openDeleteWindow(item.id);
                  }}
                >
                  <BsTrash3 />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No scheduled meetings</div>
        )}
      </div>
      {isOpenWindow && (
        <div className="flex items-center justify-center flex-col shadow-md md:w-full h-[400px] md: text-xl modal-overlay">
          <div className="modal-content">
            <p className="font-medium">
              Date:{' '}
              <span className="font-normal ml-2">
                {selectedItem.date.substring(0, 10)}
              </span>
              <span className="ml-3 font-normal">
                {selectedItem.date.substring(11, 16)}
              </span>
            </p>
            <p className="mt-5 font-medium">
              Candidate:{' '}
              <span className="font-normal ml-2">{selectedItem.candidate}</span>
            </p>
            <p className="mt-5 font-medium">
              Job which candidate apply:{' '}
              <span className="font-normal ml-2">{selectedItem.title}</span>
            </p>
            <p className="mt-5 font-medium">
              Place of interview:{' '}
              <span className="font-normal ml-2">{selectedItem.place}</span>
            </p>
            <button className="close-modal" onClick={closeInformationWindow}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      {isOpenDeleteWindow && (
        <div className="modal-overlay">
          <div className="modal-content w-[450px] h-[220px]">
            <h1 className="mt-5 text-center font-bold text-xl">
              Are You sure to delete this item ?
            </h1>
            <div className="flex mt-16 justify-center space-x-12 text-xl font-bold">
              <button
                className="bg-red-200 p-4 rounded-xl"
                onClick={() => {
                  handleDelete(deleteItem);
                }}
              >
                Delete
              </button>
              <button onClick={openDeleteWindow}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {isOpenAddWindow && (
        <AddMeeting openAddMeetingWindow={openAddMeetingWindow} />
      )}
    </div>
  );
};
