import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { AiOutlineCalendar } from 'react-icons/ai';

import 'react-datepicker/dist/react-datepicker.css';

export const AddMeeting = ({ openAddMeetingWindow }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Provide a type for selectedDate

  const handleDateChange = (date: Date | null) => {
    // Provide a type for the date parameter
    setSelectedDate(date);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content w-[520px] h-[420px]">
        <h1 className="mt-5 text-center font-bold text-xl">Add Meeting</h1>
        <div className="mt-10">
          <label htmlFor="datePick">
            Date of meeting:{' '}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
              className="ml-1"
            />
            <AiOutlineCalendar className="absolute top-[110px] right-[200px] text-xl" />
          </label>
          <div className="mt-2">
            <label htmlFor="typeOfMeeting">
              Type of meeting:{' '}
              <select>
                <option>Online</option>
                <option>Offline</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex mt-16 justify-center space-x-12 text-xl font-bold">
          <button className="bg-red-200 p-4 rounded-xl">Delete</button>
          <button onClick={openAddMeetingWindow}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
