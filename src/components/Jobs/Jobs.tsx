import React from 'react';
import './Jobs.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useFetch } from '../../custom_hooks/useFetch';
import { routerPaths } from '../../config/router';

export const Jobs = () => {
  document.title = `HR Dashboard - Jobs`;
  const { profile, dasboard, jobs, jobsAdd } = routerPaths;

  const [data, setData] = useState<any>([]);

  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const { firstName, lastName } = useFetch();

  const toggleMenu = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  const closeAvatarWindow = () => {
    setIsOpenAvatar(false);
  };

  const closeBurgerMenu = () => {
    setIsOpenBurger(false);
  };

  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9595/jobs', {
        headers: { Authorization: auth },
      });
      setData(result.data);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="dashboard">
      {isOpenAvatar ? (
        <div className="window-container">
          <div className="window relative">
            <button
              className="absolute right-[-12px] top-[-10px] text-2xl"
              onClick={closeAvatarWindow}
            >
              <AiFillCloseCircle />
            </button>
            <NavLink to="">
              <div className="flex hover:bg-slate-200 rounded-lg p-5">
                <p className="mt-2 mr-4 text-2xl bg-gray-200 w-10 h-8 rounded-xl">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </p>
                <p className="text-2xl mt-2">
                  {firstName} {lastName}
                </p>
              </div>
            </NavLink>
            <NavLink to={profile.url}>
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <BiUser className="text-4xl mr-4" />
                Profile
              </div>
            </NavLink>
            <NavLink to="">
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <GrLogout className="text-4xl mr-4" />
                Logout
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="burger-menu">
            <button
              className={`burger ${isOpenBurger ? 'open' : ''}`}
              onClick={toggleMenu}
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </button>
            {isOpenBurger ? (
              <div className="text-4xl relative">
                <button
                  className="absolute right-[-50px] top-[-70px]"
                  onClick={closeBurgerMenu}
                >
                  <AiOutlineClose />
                </button>
                <NavLink to={dasboard.url}>
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <AiOutlineHome className="icon" />
                    Home
                  </div>
                </NavLink>
                <NavLink to={jobs.url}>
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <BsChatLeft className="icon" />
                    Jobs
                  </div>
                </NavLink>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <BiUser className="icon" />
                    Candidates
                  </div>
                </NavLink>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <FaRegCalendarAlt className="icon" />
                    Calendar
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="content text-sm sm:text-md mt-40 md:mt-48 w-[340px] md:w-[550px]">
                <div className="absolute top-24 right-2 bg-orange-500 w-16 h-8 md:w-20 md:h-10 md:top-28 md:right-6 text-center text-xl md:text-2xl text-white rounded-xl flex items-center justify-center">
                  <NavLink to={jobsAdd.url}>
                    <button>Add</button>
                  </NavLink>
                </div>
                <div
                  key="position"
                  className="grid grid-cols-3 md:gap-20 gap-10 border-b-2"
                >
                  <label htmlFor="position" className="">
                    <input
                      type="checkbox"
                      id="position"
                      className="mr-5"
                      onChange={(e) => {
                        const checked = e.target.checked; // eslint-disable-line prefer-destructuring
                        setData(
                          data.map((item: any) => {
                            item.select = checked; // eslint-disable-line no-param-reassign
                            return item;
                          }),
                        );
                      }}
                    />
                    Position
                  </label>
                  <p className="md:ml-36 ml-20">Date</p>
                  <p className="text-right md:mr-5 mr-0">Action</p>
                </div>
                {currentItems.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-5 md:gap-4 mt-2 border-b-2"
                    >
                      <label
                        htmlFor="position-title"
                        className="col-span-3 flex"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={item.select || false}
                          onChange={(event) => {
                            const checked = event.target.checked; // eslint-disable-line prefer-destructuring
                            setData(
                              /* eslint-disable-next-line @typescript-eslint/no-shadow */
                              data.map((data: any) => {
                                /* eslint-disable @typescript-eslint/no-shadow */
                                if (item.id === data.id) {
                                  data.select = checked; // eslint-disable-line no-param-reassign
                                }
                                return data;
                              }),
                            );
                          }}
                        />
                        <h4 className="flex items-center">{item.title}</h4>
                      </label>
                      <h4 className="mt-2.5 ml-2 md:ml-0">
                        {item.createdAt.substring(0, 10)}
                      </h4>
                      <div className="mt-2 md:ml-7 ml-3 text-xl flex">
                        <NavLink to={`/jobs/:${item.id}`} className="mr-1">
                          <AiFillEye />
                        </NavLink>
                        <NavLink to={`/jobs/:${item.id}/edit`} className="mr-1">
                          <BiEditAlt />
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={6}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkClassName="page-num"
                  activeLinkClassName="active"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setIsOpenAvatar(!isOpenAvatar);
        }}
      >
        <div className="avatar w-[50px] h-[50px] fixed top-5 right-10 rounded-full bg-gray-300 text-white">
          <p className="text-center mt-2 text-2xl">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </p>
        </div>
      </button>
    </div>
  );
};
