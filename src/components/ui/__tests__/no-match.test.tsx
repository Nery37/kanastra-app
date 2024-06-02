// no-match.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NoMatch } from '../no-match';

test('renders no match component correctly', () => {
  render(<NoMatch />);
  const headingElement = screen.queryByText(/Nothing to see here/i);
  const paragraphElement = screen.queryByText(/Hands on the work!/i); 

  expect(headingElement).toBeDefined();
  expect(paragraphElement).toBeDefined();
});
