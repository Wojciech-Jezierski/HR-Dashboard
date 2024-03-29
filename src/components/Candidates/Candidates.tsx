import './Candidates.css';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import { useTranslation } from 'react-i18next';

import type { Candidate } from '../../types/candidate';
import {
  deleteItem,
  deleteSelectedItems as deleteItemsService,
} from '../../services/JobService';
import { getCandidates } from '../../services/CandidatesService';

export const Candidates = () => {
  document.title = `HR Dashboard - Candidates`;

  const [data, setData] = useState<Candidate[]>([]);
  const [selectedOption, setSelectedOption] = useState('Actions');
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [alert, setAlert] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled = data.filter((item) => item.select).length < 3;

  const [currentItems, setCurrentItems] = useState<Candidate[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const { t } = useTranslation();

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const getData = async () => {
      if (!token) {
        return;
      }

      try {
        const fetchedData = await getCandidates(auth);
        setData(fetchedData);
      } catch (error) {
        setErrorMessage(String(error));
      }
    };

    getData();
  }, [token, auth]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data, auth]);

  const handlePageClick: ReactPaginateProps['onPageChange'] = ({
    selected,
  }) => {
    const newOffset = (selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (alert !== '') {
      const timer = setTimeout(() => {
        setAlert('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [alert]);

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newData = data.map((item: Candidate) => ({
      ...item,
      select: checked,
    }));

    setData(newData);
  };

  const handleDelete = async (itemId: String) => {
    try {
      const response = await deleteItem(itemId, auth);

      if (response.success) {
        // Delete the item from the local state
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
        setAlert('Item deleted successfully.');
        setAlertColor('text-green-500');
      } else {
        setAlertColor('text-red-500');
        setAlert(`${response.error}`);
      }
    } catch (error) {
      setErrorMessage(String(error));
    }
  };

  const deleteSelectedItems = async () => {
    try {
      const updatedData = await deleteItemsService(data, auth);
      setData(updatedData);
      setAlert('Items deleted successfully.');
      setAlertColor('text-green-500');
      setSelectedOption('Actions');
    } catch (error) {
      setAlert(`${error}`);
      setAlertColor('text-red-500');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  if (!data) {
    return <div>{t('Actions.Loading')}</div>;
  }

  if (data.length === 0) {
    return <div>{t('Actions.NoData')}</div>;
  }

  return (
    <div className="jobs">
      <div className="flex justify-center">
        <span className={alertColor}>{alert}</span>
        <span className="text-red-500">{errorMessage}</span>
      </div>
      <div className="content text-sm sm:text-md mt-1 md:mt-12 w-[340px] md:w-[620px] xl:w-[760px]">
        <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
          <select
            className="p-2 md:mb-7 text-xl"
            disabled={isDisabled}
            onChange={deleteSelectedItems}
            value={selectedOption}
          >
            <option value="Actions">{t('Actions.Actions')}</option>
            <option value="Delete">{t('Actions.Delete')}</option>
          </select>
          <input
            className="search-candidate bg-slate-200 ml-3 w-64 h-8 text-xl mb-5 md:mb-0"
            type="text"
            placeholder={t('Actions.SearchCandidate')}
            onFocus={handleFocus}
            value={inputValue}
            onChange={handleChange}
          />
          {inputValue && (
            <span
              className="clear-icon"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Space') {
                  handleClear();
                }
              }}
              role="button"
              tabIndex={0}
            >
              x
            </span>
          )}
        </div>
        <div
          key="position"
          className="grid grid-cols-3 md:gap-20 gap-10 border-b-2"
        >
          <label htmlFor="position">
            <input
              type="checkbox"
              id="position"
              className="mr-5"
              onChange={handleAllChange}
            />
            {t('Actions.Position')}
          </label>
          <p className="md:ml-40 ml-20 xl:ml-52">{t('Actions.Date')}</p>
          <p className="text-right md:mr-5 mr-0">{t('Actions.Action')}</p>
        </div>
        {currentItems
          .filter((item: Candidate) => {
            if (inputValue.length >= 3) {
              return item.name.toLowerCase().includes(inputValue.toLowerCase());
            }
            return true; // Return true to include all items when inputValue has less than 3 characters
          })
          .map((item: Candidate) => {
            return (
              <div
                key={item.id.toString()}
                className="grid grid-cols-5 mt-2 border-b-2"
              >
                <label htmlFor="position-title" className="col-span-3 flex">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={item.select || false}
                    onChange={(event) => {
                      const { checked } = event.target;
                      setData(
                        /* eslint-disable-next-line @typescript-eslint/no-shadow */
                        data.map((data: Candidate) => {
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
                  <h4 className="flex items-center">{item.name}</h4>
                </label>
                <h4 className="mt-5 mr-5">
                  {String(item.createdAt).substring(0, 10)}
                </h4>
                <div className="mt-5 ml-5 md:ml-16 xl:ml-20 text-xl flex">
                  <NavLink
                    to={`/candidates/${item.id}`}
                    className="candidate-details md:mr-2 xl:mr-3"
                  >
                    <AiFillEye />
                  </NavLink>
                  <NavLink
                    to={`/candidates/${item.id}/edit`}
                    className="candidate-edit md:mr-2 xl:md:mr-3"
                  >
                    <BiEditAlt />
                  </NavLink>
                  <button
                    className="candidate-delete text-xl mb-7"
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
