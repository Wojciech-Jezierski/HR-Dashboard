import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AddMeeting = ({ openAddMeetingWindow }: any) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content w-[450px] h-[220px]">
        <h1 className="mt-5 text-center font-bold text-xl">Add Meeting</h1>
        <div className="flex mt-16 justify-center space-x-12 text-xl font-bold">
          <label>Date of meeting</label>
          <button className="bg-red-200 p-4 rounded-xl">Delete</button>
          <button onClick={openAddMeetingWindow}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
