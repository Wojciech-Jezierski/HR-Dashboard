import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';

export const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const jobResponse = await axios.get('http://localhost:9595/jobs', {
        headers: { Authorization: auth },
      });
      const candidatesResponse = await axios.get(
        'http://localhost:9595/candidates',
        {
          headers: { Authorization: auth },
        },
      );
      setJobs(jobResponse.data);
      setCandidates(candidatesResponse.data);
    };
    fetchData();
  }, [token, auth]);

  if (!jobs) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home-container min-[410px]:w-96 min-[550px]:w-full">
      <div className="flex flex-col sm:flex-row gap-x-20 text-2xl">
        <div className="bg-slate-200 p-10 mt-10">
          Open position: {jobs.length}
        </div>
        <div className="bg-slate-200 p-10 mt-10">
          Candidates: {candidates.length}
        </div>
      </div>
      <div className="flex">
        <div className="general mt-20 w-full h-52 bg-slate-200 p-5 text-xl sm:text-2xl">
          General
          <div className="title mt-5 flex">
            <p className="font-bold">Total 48.5% growth</p> 😎 this month
          </div>
          <div className="datas flex gap-x-10 sm:gap-x-40 mt-5">
            <div className="employees inline-flex">
              <FaUserAlt className="mt-1 mr-1" />
              245K
            </div>
            <div className="candidates inline-flex">
              <FaUserAlt className="mt-1 mr-1" />3
            </div>
            <div className="employees inline-flex">
              <FaUserAlt className="mt-1 mr-1" />
              245K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
