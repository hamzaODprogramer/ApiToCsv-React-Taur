import { Download } from "lucide-react";
import CsvDownloadButton from 'react-json-to-csv'

export default function CSV(){
    return <>
        {/* <div className="relative border-2 cursor-pointer hover:border-opacity-90 w-fit border-dashed border-opacity-50 border-indigo-700 p-2 rounded-lg">
            <img 
                src="/csv.png"
                className="opacity-40 hover:opacity-70"
                width={100}
                height={100}
            /> 
            <Download size={40} className="absolute top-[32%] left-[32%] hover:opacity-50 opacity-30" />
        </div> */}
        <CsvDownloadButton data={[{"id":1 , "name":"hamza"},{"id":2 , "name":"ouadoud"}]}>
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
        
    </>
}