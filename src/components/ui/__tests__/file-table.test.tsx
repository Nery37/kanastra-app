import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FileTable } from '../table';
import fetchMock from 'jest-fetch-mock';

// Configura o mock global para fetch
fetchMock.enableMocks();

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  close: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test('renders file table correctly', async () => {
  const mockData = [
    { id: 1, name: 'file1.txt', mime_type: 'text/plain', size: 1000 },
    { id: 2, name: 'file2.txt', mime_type: 'text/plain', size: 2000 },
  ];

  fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }), { status: 200, headers: { 'content-type': 'application/json' } });

  render(
    <MemoryRouter>
      <FileTable />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Type')).toBeTruthy();
    expect(screen.getByText('Size')).toBeTruthy();

    expect(screen.getByTestId('file1-name')).toBeTruthy();
    expect(screen.getByTestId('file2-name')).toBeTruthy();
    expect(screen.getByTestId('file1-type')).toBeTruthy();
    expect(screen.getByTestId('file2-type')).toBeTruthy();
    expect(screen.getByTestId('file1-size')).toBeTruthy();
    expect(screen.getByTestId('file2-size')).toBeTruthy();
  });
});
