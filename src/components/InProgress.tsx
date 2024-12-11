
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function InProgress({ apiString , ok } : InProgessType){
    
    return <>
        <div className="rounded-md bg-slate-700 w-full py-3 px-3">
            <div className="flex flex-row items-center gap-1">
                <Loader2 className="animate-spin text-[white]" size={16}/>
                <span className="text-white/80 font-normal -mt-[1px]">Fetching</span>
                <span className="text-white font-extralight ml-1 -mt-[.5px]">{apiString}</span>
                { ok && <span className="ml-auto text-[#14EF10] mr-1 font-semibold mt-[1px]">OK 200</span> }
            </div>
        </div>
    </>
}