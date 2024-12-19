'use client';



import * as React from "react";

import {IconType} from "react-icons";



export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon:IconType;
}


const FadeBlurInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,Icon, ...props }, ref) => {
        return (
         <div className="relative inline-flex w-full">
                    <input
                        type="text"

                        className='w-full p-2 pr-12 pl-5 text-gray-100 bg-slate-800   rounded-full focus:outline-none'
                        ref={ref}
                        {...props}
                    />
                    <span

                        className='absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 p-1 text-white rounded-full focus:outline-none  bg-white/20 '

                    >
                        <Icon size={16} className="backdrop-blur-sm " />

                    </span>



                </div>


    );
    });

export default FadeBlurInput;