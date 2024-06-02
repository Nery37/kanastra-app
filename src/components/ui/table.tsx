import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FileTable = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      const fetchData = async () => {
        try {
          const loadingAlert = Swal.fire({
            title: 'Carregando...',
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false,
          });

          const response = await fetch('http://localhost:8000/api/file');
          if (response.ok) {
            const data = await response.json();
            setFileList(data.data);
          } else {
            throw new Error('Failed to fetch data');
          }

          loadingAlert.close();
        } catch (error) {
          console.error('Error fetching data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Falha ao buscar a lista de arquivos.',
          });
        } finally {
          setLoading(false);
          setFetched(true);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Arquivos</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
          >
            Voltar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file) => (
                <tr key={file.id}>
                  <td data-testid={`file${file.id}-id`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {file.id}
                  </td>
                  <td data-testid={`file${file.id}-name`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {file.name}
                  </td>
                  <td data-testid={`file${file.id}-type`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {file.mime_type}
                  </td>
                  <td data-testid={`file${file.id}-size`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {file.size} bytes
                  </td>
                </tr>
              ))}
          </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export { FileTable };
