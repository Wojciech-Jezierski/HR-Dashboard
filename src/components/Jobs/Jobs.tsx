import React from 'react';
import './Jobs.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useAuthToken } from '../../custom_hooks/useAuthToken';
import { Data } from '../../types/data';

export const Jobs = () => {
  document.title = `HR Dashboard - Jobs`;

  const [data, setData] = useState<Data[]>([]);
  const [selectedItems, setSelectedItems] = useState<String[]>([]);
  const [selectedOption, setSelectedOption] = useState('Actions');

  const isDisabled = data.filter((item) => item.select).length < 3;

  const [currentItems, setCurrentItems] = useState<Object[]>([]);
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

  useEffect(() => {
    const items = data
      .filter((item) => item.select === true)
      .map((item) => item.id);
    setSelectedItems(items);
  }, [data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleAllChange = (e: any) => {
    const { checked } = e.target;
    const newData = data.map((item: any) => {
      return {
        ...item,
        select: checked,
      };
    });

    setData(newData);
  };

  const handleDelete = async (itemId: String) => {
    try {
      // Make a DELETE request to the API endpoint with the item ID
      const response = await fetch(`http://localhost:9595/jobs/:${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: auth },
      });

      if (response.ok) {
        // Delete the item from the local state
        setData((prevData: any) =>
          prevData.filter((item: any) => item.id !== itemId),
        );
        console.log('Item deleted successfully!');
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error occurred while deleting item:', error);
    }
  };

  const deleteSelectedItems = async () => {
    const selectedItem = data
      .filter((item) => item.select === true)
      .map((item) => item.id);
    try {
      await Promise.all(
        selectedItem.map((id) =>
          axios.delete(`http://localhost:9595/jobs/${id}`, {
            headers: { Authorization: auth },
          }),
        ),
      );

      const updatedData = data.filter((item) => item.select === undefined);
      setData(updatedData);
      setSelectedItems([]);
      console.log('Multiple elements deleted successfully!');
      setSelectedOption('Actions');
    } catch (error) {
      console.log('Error deleting elements:', error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="jobs">
      <div className="content text-sm sm:text-md mt-40 md:mt-12 w-[340px] md:w-[620px] xl:w-[760px]">
        <select
          className="p-2 mb-7 text-md"
          disabled={isDisabled}
          onChange={deleteSelectedItems}
          value={selectedOption}
        >
          <option value="Actions">Actions</option>
          <option value="Delete">Delete</option>
        </select>
        <div
          key="position"
          className="grid grid-cols-3 md:gap-20 gap-10 border-b-2"
        >
          <label htmlFor="position" className="">
            <input
              type="checkbox"
              id="position"
              className="mr-5"
              onChange={handleAllChange}
            />
            Position
          </label>
          <p className="md:ml-40 ml-20 xl:ml-52">Date</p>
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
              <h4 className="mt-5 mr-5">{item.createdAt.substring(0, 10)}</h4>
              <div className="mt-5 ml-5 md:ml-16 xl:ml-20 text-xl flex">
                <NavLink to={`/jobs/${item.id}`} className="md:mr-2 xl:mr-3">
                  <AiFillEye />
                </NavLink>
                <NavLink
                  to={`/jobs/${item.id}/edit`}
                  className="md:mr-2 xl:md:mr-3"
                >
                  <BiEditAlt />
                </NavLink>
                <button
                  className="text-xl  mb-7"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <MdDelete />
                </button>
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
