import { JSX } from "react";

export default function CsvOutPut({csvs}:{csvs:JSX.Element[]}){
    return (
        <div className="flex items-center gap-2 px-3 py-3 flex-grow border-solid border-2 border-indigo-700 rounded-lg">
            {csvs.map((csv, idx) => (
                <div key={idx}>
                    {csv}
                </div>
            ))}
        </div> 
    )
}