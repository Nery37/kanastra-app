import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileProvider } from './components/ui/file';
import { Layout, FileUploader, FileTable } from './components/ui';
import { NoMatch } from './components/ui/no-match';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <FileProvider>
              <FileUploader />
            </FileProvider>
          }
        />
        <Route
          path="table"
          element={
            <FileProvider>
              <FileTable />
            </FileProvider>
          }
        />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);
