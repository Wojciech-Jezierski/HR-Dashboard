import { render, screen } from '@testing-library/react';

import { App } from './App';

test('renders intro screen', () => {
  render(<App />);

  const intoHeading = screen.getByText(/mentoring frontend start/i);

  expect(intoHeading).toBeInTheDocument();
});
