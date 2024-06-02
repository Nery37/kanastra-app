import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true); // Inicia o estado de upload

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = data.success;
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: successMessage || 'Arquivo enviado com sucesso!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falha no upload do arquivo.',
        });
      }
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao enviar o arquivo.',
      });
    } finally {
      setUploading(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Upload de Arquivos</h1>
          <button
            onClick={() => navigate('/table')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Arquivos
          </button>
        </div>
        <div className="mt-6">
          <label htmlFor="file" className="sr-only">
            Escolha um arquivo
          </label>
          <input
            id="file"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {file && (
          <section>
            <p className="pt-6 pb-2">Detalhes do Arquivo:</p>
            <ul>
              <li>Nome: {file.name}</li>
              <li>Tipo: {file.type}</li>
              <li>Tamanho: {file.size} bytes</li>
            </ul>
            <button
              onClick={handleUpload}
              className={`mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${uploading && 'opacity-50 cursor-not-allowed'}`}
              disabled={uploading}
            >
              {uploading ? 'Enviando...' : 'Enviar Arquivo'}
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export { FileUploader };
