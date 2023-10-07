import { AiOutlineHome } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GiBlackFlag } from 'react-icons/gi';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

import { routerPaths } from '../../config/router';

export const Sidebar = () => {
  const { dasboard, profile, jobs, jobsAdd, candidates, blacklist, meetings } =
    routerPaths;
  const location = useLocation();
  const visiblePaths = [
    dasboard.url,
    profile.url,
    jobs.url,
    jobsAdd.url,
    candidates.url,
    blacklist.url,
    meetings.url,
    '/',
  ];
  const isSidebarVisible = visiblePaths.includes(location.pathname);
  const [selectedMenu, setSelectedMenu] = useState<null | string>('home');

  if (!isSidebarVisible) {
    return null;
  }

  const handleMenuClick = (item: string) => {
    setSelectedMenu(item);
  };

  return (
    <div className="sidebar">
      <h3 className="text-center text-3xl">HR_Analitycs</h3>
      <ul className="mt-20">
        <NavLink
          to={dasboard.url}
          onClick={() => {
            handleMenuClick('home');
          }}
          className="sidebar-link"
        >
          <div className={selectedMenu === 'home' ? 'active' : undefined}>
            <li className="link-list">
              <AiOutlineHome className="icon" />
              Home
            </li>
          </div>
        </NavLink>
        <NavLink
          to={jobs.url}
          onClick={() => {
            handleMenuClick('jobs');
          }}
        >
          <div className={selectedMenu === 'jobs' ? 'active' : undefined}>
            <li className="link-list">
              <BsChatLeft className="icon" />
              Jobs
            </li>
          </div>
        </NavLink>
        <NavLink
          to={candidates.url}
          onClick={() => {
            handleMenuClick('blacklist');
          }}
        >
          <div className={selectedMenu === 'blacklist' ? 'active' : undefined}>
            <li className="link-list">
              <BiUser className="icon" />
              Candidates
            </li>
          </div>
        </NavLink>
        <NavLink
          to={blacklist.url}
          onClick={() => {
            handleMenuClick('candidates');
          }}
        >
          <div className={selectedMenu === 'candidates' ? 'active' : undefined}>
            <li className="link-list">
              <GiBlackFlag className="icon" />
              BlackList
            </li>
          </div>
        </NavLink>
        <NavLink
          to={meetings.url}
          onClick={() => {
            handleMenuClick('calendar');
          }}
        >
          <div className={selectedMenu === 'calendar' ? 'active' : undefined}>
            <li className="link-list">
              <FaRegCalendarAlt className="icon" />
              Calendar
            </li>
          </div>
        </NavLink>
      </ul>
    </div>
  );
};
