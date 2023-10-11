import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';

test('renders the App component with the expected title', () => {
  render(<App />);

  // Check if the title is correctly set
  expect(document.title).toBe('HR Dashboard');
});
