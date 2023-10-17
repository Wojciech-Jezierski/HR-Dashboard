import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routerPaths } from '../../config/router';

export const AddButton = () => {
  const { t } = useTranslation();
  const { jobs, jobsAdd, candidates, candidatesAdd } = routerPaths;
  const location = useLocation();
  const visibleJobButtonPaths = [jobs.url];
  const visibleCandidateButtonPaths = [candidates.url];
  const isAddJobButtonVisible = visibleJobButtonPaths.includes(
    location.pathname,
  );
  const isAddCandidateButtonVisible = visibleCandidateButtonPaths.includes(
    location.pathname,
  );

  if (!isAddJobButtonVisible && !isAddCandidateButtonVisible) {
    return null;
  }

  return (
    <div className="absolute top-24 right-2 bg-orange-500 w-16 h-8 md:w-20 md:h-10 md:top-28 md:right-6 text-center text-xl md:text-2xl text-white rounded-xl flex items-center justify-center">
      {isAddJobButtonVisible && (
        <NavLink to={jobsAdd.url}>
          <button>{t('AddButton.Add')}</button>
        </NavLink>
      )}
      {isAddCandidateButtonVisible && (
        <NavLink to={candidatesAdd.url}>
          <button>{t('AddButton.Add')}</button>
        </NavLink>
      )}
    </div>
  );
};
