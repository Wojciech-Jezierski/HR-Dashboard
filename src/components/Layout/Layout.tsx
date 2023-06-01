import React from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../Sidebar/Sidebar';

export const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <Sidebar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer className="text-center absolute bottom-0">Stopka</footer> */}
    </div>
  );
};
