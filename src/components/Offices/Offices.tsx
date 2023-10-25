import React, { useState, useEffect } from 'react';
import { TbClockHour5 } from 'react-icons/tb';

import { getOffices } from '../../services/OfficeService';
import type { OfficesType } from '../../types/officesType';

export const Offices = () => {
  document.title = `HR Dashboard - Offices`;

  const [data, setData] = useState<OfficesType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getOffices();
        setData(fetchedData.data);
      } catch (error) {
        setErrorMessage(String(error));
      }
    };

    getData();
  }, []);
  return (
    <div className="flex flex-wrap mt-5 md:mt-20 text-center">
      {data.map((item: OfficesType) => (
        <div key={item.name} className="p-5 border">
          <h1 className="text-xl font-bold bg-pink-200 p-2">{item.name}</h1>

          <p className="mt-2 p-2 flex">
            {item.street} {item.unit}/{item.building}
          </p>
          <p>
            {item.city} {item.zipCode}
          </p>
          <p className="p-2">Capacity: {item.capacity}</p>
          <p className="p-2 flex justify-center">
            <TbClockHour5 className="mt-1 mr-1" />
            {item.openHour} - {item.closeHour}
          </p>
        </div>
      ))}
    </div>
  );
};
