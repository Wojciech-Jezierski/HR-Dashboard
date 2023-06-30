import React from 'react';
import './Jobs.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useAuthToken } from '../../custom_hooks/useAuthToken';
import { Data } from '../../types/data';

export const Jobs = () => {
  document.title = `HR Dashboard - Jobs`;

  const [data, setData] = useState<Data[]>([]);

  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const token = useAuthToken();
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9595/jobs', {
        headers: { Authorization: auth },
      });
      setData(result.data);
    };
    if (!token) {
      return;
    }
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
    <div className="jobs">
      <div className="content text-sm sm:text-md mt-40 md:mt-12 w-[340px] md:w-[550px] xl:w-full">
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
                const { checked } = e.target;
                setData(
                  data.map((item: any) => {
                    return {
                      ...item,
                      select: checked,
                    };
                  }),
                );
              }}
            />
            Position
          </label>
          <p className="md:ml-40 ml-20">Date</p>
          <p className="text-right md:mr-5 mr-0">Action</p>
        </div>
        {currentItems.map((item: any) => {
          return (
            <div key={item.id} className="grid grid-cols-5 mt-2 border-b-2">
              <label htmlFor="position-title" className="col-span-3 flex">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.select || false}
                  onChange={(event) => {
                    const { checked } = event.target;
                    setData(
                      /* eslint-disable-next-line @typescript-eslint/no-shadow */
                      data.map((data: any) => {
                        /* eslint-disable @typescript-eslint/no-shadow */
                        if (item.id === data.id) {
                          return {
                            ...item,
                            select: checked,
                          };
                        }
                        return data;
                      }),
                    );
                  }}
                />
                <h4 className="flex items-center">{item.title}</h4>
              </label>
              <h4 className="mt-2.5 mr-12">
                {item.createdAt.substring(0, 10)}
              </h4>
              <div className="mt-2 md:ml-16 ml-5 text-xl flex">
                <NavLink to={`/jobs/${item.id}`} className="mr-3">
                  <AiFillEye />
                </NavLink>
                <NavLink to={`/jobs/${item.id}/edit`}>
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
    </div>
  );
};
