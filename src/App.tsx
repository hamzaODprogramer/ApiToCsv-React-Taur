import React, { useState } from 'react';
import { Download, Upload, Server } from 'lucide-react';

export default function App () {
  const [apiUrl, setApiUrl] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndConvertData = async () => {
    // Réinitialiser les états
    setLoading(true);
    setError(null);
    setApiData(null);

    try {
      // Fetch des données depuis l'API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Échec de la récupération des données');
      }

      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const convertToCsv = (data) => {
    if (!data || data.length === 0) return '';

    // Extraire les en-têtes
    const headers = Object.keys(data[0]).join(',');
    
    // Convertir chaque ligne en CSV
    const csvRows = data.map(obj => 
      Object.values(obj)
        .map(val => 
          `"${String(val).replace(/"/g, '""')}"` // Échapper les guillemets
        )
        .join(',')
    );

    return `${headers}\n${csvRows.join('\n')}`;
  };

  const downloadCsv = () => {
    if (!apiData) return;

    const csvContent = convertToCsv(apiData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'api_data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Server className="h-8 w-8" />
            <h1 className="text-2xl font-bold">API to CSV Converter</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mt-10 flex-grow">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <label htmlFor="apiUrl" className="block text-gray-700 font-bold mb-2">
              URL de l'API
            </label>
            <div className="flex">
              <input 
                type="text" 
                id="apiUrl"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="Entrez l'URL de l'API"
                className="flex-grow border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={fetchAndConvertData}
                disabled={!apiUrl || loading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Charger</span>
              </button>
            </div>
          </div>

          {/* Statuts et Erreurs */}
          {loading && (
            <div className="text-blue-600 mb-4">Chargement des données...</div>
          )}
          {error && (
            <div className="text-red-600 mb-4">Erreur : {error}</div>
          )}

          {/* Aperçu des Données */}
          {apiData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Aperçu des Données</h2>
              <div className="max-h-96 overflow-auto border rounded">
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      {Object.keys(apiData[0] || {}).map((header, index) => (
                        <th key={index} className="p-3 text-left border-b">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex} className="p-3 border-b">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bouton de Téléchargement */}
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={downloadCsv}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Télécharger CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 API to CSV Converter. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

