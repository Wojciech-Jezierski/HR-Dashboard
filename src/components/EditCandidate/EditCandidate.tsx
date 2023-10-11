import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { routerPaths } from '../../config/router';
import { editCandidateSchema } from '../../config/schemas';
import { getCandidateById } from '../../services/CandidatesService';

export const EditCandidate = () => {
  document.title = `HR Dashboard - Edit Candidate`;

  const { candidates } = routerPaths;
  const [message, setMessage] = useState('');
  const [fetchError, setFetchError] = useState<null | Error>(null);

  const [data, setData] = useState({
    name: '',
    position: '',
  });

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${candidates.url}`);
  };

  type User = InferType<typeof editCandidateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(editCandidateSchema),
    mode: 'onChange',
  });

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;

  const url = window.location.pathname;
  const pieces = url.split('/');
  const id = pieces[pieces.length - 2];

  function onSubmit(values: Object) {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/candidates/${id}`, values, {
        headers: { Authorization: auth },
      })
      .then(() => {
        onRedirect();
      })
      .catch(() => {
        setMessage('Something went wrong. Try again later.');
      });
  }

  useEffect(() => {
    const jobsById = async () => {
      try {
        const candidate = await getCandidateById(id, auth);
        setData(candidate);
      } catch (error) {
        setFetchError(error as Error);
      }
    };

    jobsById();
  }, [auth, id]);

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-candidate">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content grid grid-cols-2 gap-4 mt-10">
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="user">
                <p>User:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="User"
                  defaultValue={data.name}
                  {...register('name')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.name?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="Position">
                <p>Position:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Position"
                  defaultValue={data.position}
                  {...register('position')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.position?.message}
              </span>
            </div>

            <div className="col-span-2 mt-14">
              <button
                type="submit"
                className="bg-orange-500 w-80 md:w-full md:text-2xl h-10 rounded-xl text-white text-xl"
              >
                Submit
              </button>
              <span className="text-xl text-red-500">
                <p className="text-center mt-2">{message}</p>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
