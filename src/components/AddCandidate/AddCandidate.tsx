import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { routerPaths } from '../../config/router';
import { addCandidateSchema } from '../../config/schemas';
import { Candidate } from '../../types/candidate';

export const AddCandidate = () => {
  document.title = `HR Dashboard - Add Job`;

  const { candidates } = routerPaths;
  const [data, setData] = useState<Candidate[]>([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${candidates.url}`);
  };

  type User = InferType<typeof addCandidateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(addCandidateSchema),
  });

  const token =
    window.localStorage.getItem('USER_TOKEN') ||
    window.sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  function onSubmit(values: Object) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/candidates`, values, {
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
    <div className="add-candidate">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content grid grid-cols-2 gap-4 mt-10">
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="name">
                <p>Name:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Name"
                  {...register('name')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.name?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="position">
                <p>Position:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Position"
                  {...register('position')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.position?.message}
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
            <div className="col-span-1 row-span-3  w-36 md:w-64 h-44">
              <label htmlFor="longDescription">
                <p>Long Description:</p>
                <textarea
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-60 max-h-60"
                  placeholder="Long Description"
                  {...register('longDescription')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.longDescription?.message}
              </span>
            </div>
            <div className="col-span-1  w-36 md:w-64 h-20">
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
            <div className="col-span-1 w-36 md:w-64 h-20 md:mt-0">
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
