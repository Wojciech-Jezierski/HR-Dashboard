import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import './Meetings.css';
import { useTranslation } from 'react-i18next';

import type { Meeting } from '../../types/meeting';
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
  const [errorMessage, setErrorMessage] = useState('');

  const { t } = useTranslation();

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
      } catch (error) {
        setErrorMessage(String(error));
      }
    };

    fetchData();
  }, [month, year]);

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
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
      setIsOpenDeleteWindow(false);
    } catch (error) {
      setErrorMessage(String(error));
    }
  };

  const openInformationWindow = (
    id: string,
    date: string,
    candidate: string,
    title: string,
    place: string,
  ) => {
    setIsOpenWindow(!isOpenWindow);
    setSelectedItem({ id, date, candidate, title, place });
  };

  const closeInformationWindow = () => {
    setIsOpenWindow(false);
  };

  const openDeleteWindow = (id: string) => {
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
  }, [month, year]);

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
          <button
            onClick={openAddMeetingWindow}
            className="bg-orange-400 text-white w-20 h-10 md:w-32 md:h-10 mt-5 md:mt-[40px] ml-7 rounded-xl text-md"
          >
            {t('Meeting.AddMeeting')}
          </button>
        </div>
        <button
          className="meeting-left-arrow text-xl"
          onClick={previousMonth}
          disabled={isDisabled}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="meeting-right-arrow ml-5 text-xl mr-8"
          onClick={nextMonth}
        >
          <AiOutlineArrowRight />
        </button>
        <div className="min-w-[160px]">
          <p className="text-xl">
            <span>{monthName}</span>
            <span className="ml-3">{year}</span>
          </p>
        </div>
      </div>
      <span className="flex justify-center text-red-500 mt-5">
        {errorMessage}
      </span>
      <div className="mt-10 text-center">
        {data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id}>
              <div className="flex border relative">
                <p className="md:text-xl p-5">{item.date.substring(0, 10)}</p>
                <p className="md:text-xl p-5 ml-5">
                  {item.date.substring(11, 16)}
                </p>
                <p className="md:text-xl p-5 ml-2">
                  {t('Meeting.MeetingWith')}
                </p>
                <p className="md:text-xl pt-5 mr-20">{item.candidate.name}</p>
                <button
                  className="meeting-info md:text-xl absolute top-5 right-10 bg-yellow-300 rounded-xl"
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
          <div>{t('Meeting.NoScheduledMeeting')}</div>
        )}
      </div>
      {isOpenWindow && (
        <div className="flex items-center justify-center flex-col shadow-md md:w-full h-[400px] md: text-xl modal-overlay">
          <div className="modal-content">
            <p className="font-medium">
              {t('Meeting.Date')}{' '}
              <span className="font-normal ml-2">
                {selectedItem.date.substring(0, 10)}
              </span>
              <span className="ml-3 font-normal">
                {selectedItem.date.substring(11, 16)}
              </span>
            </p>
            <p className="mt-5 font-medium">
              {t('Meeting.Candidate')}{' '}
              <span className="font-normal ml-2">{selectedItem.candidate}</span>
            </p>
            <p className="mt-5 font-medium">
              {t('Meeting.Job')}{' '}
              <span className="font-normal ml-2">{selectedItem.title}</span>
            </p>
            <p className="mt-5 font-medium">
              {t('Meeting.Place')}{' '}
              <span className="font-normal ml-2">{selectedItem.place}</span>
            </p>
            <button className="close-modal" onClick={closeInformationWindow}>
              {t('Meeting.Close')}
            </button>
          </div>
        </div>
      )}
      {isOpenDeleteWindow && (
        <div className="modal-overlay">
          <div className="modal-content w-[450px] h-[220px]">
            <h1 className="mt-5 text-center font-bold text-xl">
              {t('Meeting.DeleteConfirmation')}
            </h1>
            <div className="flex mt-16 justify-center space-x-12 text-xl font-bold">
              <button
                className="bg-red-200 p-4 rounded-xl"
                onClick={() => {
                  handleDelete(deleteItem);
                }}
              >
                {t('Meeting.Delete')}
              </button>
              <button onClick={() => openDeleteWindow}>Cancel</button>
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
