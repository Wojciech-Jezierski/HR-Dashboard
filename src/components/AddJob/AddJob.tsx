import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { useAuthToken } from '../../custom_hooks/useAuthToken';
import { routerPaths } from '../../config/router';
import { addJobSchema } from '../../config/schemas';
import { Data } from '../../types/data';

export const AddJob = () => {
  document.title = `HR Dashboard - Add Job`;

  const { jobs } = routerPaths;
  const [data, setData] = useState<Data[]>([]);
  const [message, setMessage] = useState('');
  const token = useAuthToken();

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${jobs.url}`);
  };

  type User = InferType<typeof addJobSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(addJobSchema),
  });

  const auth = `Bearer ${token}`;
  function onSubmit(values: Object) {
    return axios
      .post('http://localhost:9595/jobs', values, {
        headers: { Authorization: auth },
      })
      .then(() => {
        onRedirect();
      })
      .catch(() => {
        setMessage('Something went wrong. Try again later.');
      });
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content grid grid-cols-2 gap-4 mt-10">
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="jobTitle">
                <p>Job Title:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Job Title"
                  {...register('title')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.title?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="shortDescription">
                <p>Short Description:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Short Description"
                  {...register('shortDescription')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.shortDescription?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20 mt-20 md:mt-10">
              <label htmlFor="companyName">
                <p>Company Name:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Company Name"
                  {...register('companyName')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.companyName?.message}
              </span>
            </div>
            <div className="col-span-1 row-span-2  w-36 md:w-64 h-44 mt-20 md:mt-10">
              <label htmlFor="longDescription">
                <p>Long Description:</p>
                <textarea
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-36 max-h-36"
                  placeholder="Long Description"
                  {...register('longDescription')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.longDescription?.message}
              </span>
            </div>
            <div className="col-span-1  w-36 md:w-64 h-20 mt-20 md:mt-10">
              <label htmlFor="logo">
                <p>Logo:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Logo"
                  {...register('logo')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.logo?.message}
              </span>
            </div>
            <div className="col-span-2 mt-14">
              <button
                type="submit"
                className="bg-orange-500 w-80 md:w-full md:text-2xl h-10 rounded-xl text-white text-xl"
              >
                Submit
              </button>
              <span className="text-xl text-red-500">{message}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
