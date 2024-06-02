import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploader } from '../file-uploader';

// Criando um mock para useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders file uploader correctly', () => {
  render(<FileUploader />);

  const titleElement = screen.getByText('Upload de Arquivos');
  expect(titleElement).toBeDefined();

  const fileInputElement = screen.getByLabelText('Escolha um arquivo');
  expect(fileInputElement).toBeDefined();

  fireEvent.change(fileInputElement, { target: { files: [new File(['test'], 'test.csv', { type: 'text/csv' })] } });

  const fileNameElement = screen.getByText('Nome:', { exact: false });
  expect(fileNameElement).toBeDefined();

  const fileTypeElement = screen.getByText('Tipo:', { exact: false });
  expect(fileTypeElement).toBeDefined();

  const fileSizeElement = screen.getByText('Tamanho:', { exact: false });
  expect(fileSizeElement).toBeDefined();

  const uploadButtonElement = screen.getByText('Enviar Arquivo');
  expect(uploadButtonElement).toBeDefined();
});
