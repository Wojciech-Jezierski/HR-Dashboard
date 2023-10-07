import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { routerPaths } from '../../config/router';
import { editJobSchema } from '../../config/schemas';
import { getJobsById } from '../../services/JobService';

export const EditJob = () => {
  document.title = `HR Dashboard - Add Job`;

  const { jobs } = routerPaths;
  const [message, setMessage] = useState('');
  const [fetchError, setFetchError] = useState<null | Error>(null);

  const [data, setData] = useState({
    title: '',
    companyName: '',
    logo: '',
    longDescription: '',
    shortDescription: '',
    status: '',
  });

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${jobs.url}`);
  };

  type User = InferType<typeof editJobSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(editJobSchema),
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
      .patch(`${process.env.REACT_APP_API_URL}/jobs/${id}`, values, {
        headers: { Authorization: auth },
      })
      .then((response) => {
        console.log(response);
        onRedirect();
      })
      .catch((error) => {
        console.log(error);
        setMessage('Something went wrong. Try again later.');
      });
  }

  useEffect(() => {
    const jobsById = async () => {
      try {
        const job = await getJobsById(id, auth);
        setData(job);
      } catch (error) {
        setFetchError(error as Error);
      }
    };

    jobsById();
  }, []);

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-job">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content grid grid-cols-2 gap-4 mt-10">
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="jobTitle">
                <p>Job Title:</p>
                <input
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder="Job Title"
                  defaultValue={data.title}
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
                  defaultValue={data.shortDescription}
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
                  defaultValue={data.companyName}
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
                  className="bg-slate-200 mt-1 w-36 md:w-64 h-44 max-h-44"
                  placeholder="Long Description"
                  defaultValue={data.longDescription}
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
                  defaultValue={data.logo}
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
