'use client'
import { Upload, Server, Download } from 'lucide-react';
import InProgress from './components/InProgress';
import CsvOutPut from './components/CsvOutput';
import { JSX, useState } from 'react';
import CsvDownloadButton from 'react-json-to-csv'
export default function App () {

  const [currentApi,setCurrentApi] = useState<string>('')
  //const [currentResponse,setCurrentResponse] = useState([])
  const [progress,setProgress] = useState<boolean>(false)
  //const [apis,setApis] = useState<string[]>([])
  const [csvs,setCsvs] = useState<JSX.Element[]>([])
  const [ok,setOk] = useState<boolean>(false)
  const fetchApi = async () => {
    setProgress(true)
    const response = await fetch(currentApi)
    const responseData = await response.json()
    
    await new Promise(resolve => setTimeout(resolve, 700))
    setOk(true)
    await new Promise(resolve => setTimeout(resolve, 900))
    setProgress(false)
    setCsvs(prevCsvs => [
      ...prevCsvs, 
      <CsvDownloadButton data={responseData} key={prevCsvs.length} filename={(currentApi.split('/'))[(currentApi.split('/')).length-1]}>
          <div className="relative border-2 cursor-pointer hover:border-opacity-90 w-fit border-dashed border-opacity-50 border-indigo-700 p-2 rounded-lg">
              <img 
                  src="/csv.png"
                  className="opacity-40 hover:opacity-70"
                  width={100}
                  height={100}
              /> 
              <Download size={40} className="absolute top-[32%] left-[32%] hover:opacity-50 opacity-30" />
          </div>
      </CsvDownloadButton>
    ])
    setOk(false)
  }

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
        <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col gap-5">
          <div className="">
            <label htmlFor="apiUrl" className="block text-gray-700 font-bold mb-2">
              URL de l'API
            </label>
            <div className="flex">
              <input 
                type="text" 
                id="apiUrl"
                value={currentApi}
                onChange={(e) => setCurrentApi(e.target.value)}
                placeholder="Entrez l'URL de l'API"
                className="flex-grow border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={fetchApi}
                disabled={progress || currentApi.length<1}
                className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Charger</span>
              </button>
            </div>
          </div>
          {progress && <InProgress apiString={currentApi} ok={ok}/> }
          
          {csvs.length > 0 && <CsvOutPut csvs={csvs}/>}
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

