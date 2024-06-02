// layout.test.tsx
import React from 'react';
import { render, screen, } from '@testing-library/react';
import { Layout } from '../layout';

test('renders layout correctly', () => {
  render(<Layout />);
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeDefined();
});

