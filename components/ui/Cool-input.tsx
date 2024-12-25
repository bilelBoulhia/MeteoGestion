'use client';



import * as React from "react";

import {IconType} from "react-icons";
import {cn} from "@/lib/utils";



export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon:IconType;
}


const FadeBlurInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,Icon, ...props }, ref) => {
        return (
            <div className="relative inline-flex w-full">
                <input

                    type={type}
                    className={cn(
                        className,
                        'w-full p-2 pr-12 focus:bg-sky-950 focus:text-white pl-5 placeholder:text-white bg-sky-950 rounded-xl focus:outline-none text-white'
                    )}
                    ref={ref}
                    {...props}
                />


                <span

                    className='absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 p-1 text-white rounded-xl focus:outline-none  bg-white/20 '

                >
                        <Icon size={16} className="backdrop-blur-sm "/>

                    </span>


            </div>


        );
    });

export default FadeBlurInput;