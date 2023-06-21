import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { routerPaths } from '../../config/router';

export const AddButton = () => {
  const { jobs, jobsAdd } = routerPaths;
  const location = useLocation();
  const visiblePaths = [jobs.url];
  const isAddButtonVisible = visiblePaths.includes(location.pathname);

  if (!isAddButtonVisible) {
    return null;
  }
  return (
    <div className="absolute top-24 right-2 bg-orange-500 w-16 h-8 md:w-20 md:h-10 md:top-28 md:right-6 text-center text-xl md:text-2xl text-white rounded-xl flex items-center justify-center">
      <NavLink to={jobsAdd.url}>
        <button>Add</button>
      </NavLink>
    </div>
  );
};
