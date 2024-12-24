
import React from "react";
import {cn} from "@/utils/cn";


export const Badge =({className,Label,children}:{children?:React.ReactNode,Label:string,className?:string})=>{
    return (
        <div className="absolute top-2 right-2 z-10">
            <div
                className={cn(" bg-slate-600 text-white    font-bold px-2 py-1 rounded-xl flex items-center gap-1 shadow-md transform hover:scale-105 transition-transform duration-200",className)}>
                {children}
                {Label}
            </div>
        </div>
    )
}