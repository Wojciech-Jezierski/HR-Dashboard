import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { routerPaths } from '../../config/router';
import { addCandidateSchema } from '../../config/schemas';

export const AddCandidate = () => {
  document.title = `HR Dashboard - Add Job`;

  const { candidates } = routerPaths;
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const { t } = useTranslation();

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

  return (
    <div className="add-candidate">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content grid grid-cols-2 gap-4 mt-10">
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="name">
                <p>{t('AddCandidate.Name')}</p>
                <input
                  className="candidate-name bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder={t('AddCandidate.Name')}
                  {...register('name')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.name?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="position">
                <p>{t('AddCandidate.Position')}</p>
                <input
                  className="candidate-position bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder={t('AddCandidate.Position')}
                  {...register('position')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.position?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20">
              <label htmlFor="shortDescription">
                <p>{t('AddCandidate.ShortDescription')}</p>
                <input
                  className="candidate-short-description bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder={t('AddCandidate.ShortDescription')}
                  {...register('shortDescription')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.shortDescription?.message}
              </span>
            </div>
            <div className="col-span-1 row-span-3  w-36 md:w-64 h-44">
              <label htmlFor="longDescription">
                <p>{t('AddCandidate.LongDescription')}</p>
                <textarea
                  className="candidate-long-description bg-slate-200 mt-1 w-36 md:w-64 h-60 max-h-60"
                  placeholder={t('AddCandidate.LongDescription')}
                  {...register('longDescription')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.longDescription?.message}
              </span>
            </div>
            <div className="col-span-1  w-36 md:w-64 h-20">
              <label htmlFor="logo">
                <p>{t('AddCandidate.Logo')}</p>
                <input
                  className="candidate-logo bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder={t('AddCandidate.Logo')}
                  {...register('logo')}
                />
              </label>
              <span className="text-md text-red-500">
                {errors?.logo?.message}
              </span>
            </div>
            <div className="col-span-1 w-36 md:w-64 h-20 md:mt-0">
              <label htmlFor="companyName">
                <p>{t('AddCandidate.CompanyName')}</p>
                <input
                  className="candidate-company-name bg-slate-200 mt-1 w-36 md:w-64 h-12"
                  placeholder={t('AddCandidate.CompanyName')}
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
                className="candidate-submit-btn bg-orange-500 w-80 md:w-full md:text-2xl h-10 rounded-xl text-white text-xl"
              >
                {t('AddCandidate.Submit')}
              </button>
              <span className="text-xl text-red-500">{message}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
