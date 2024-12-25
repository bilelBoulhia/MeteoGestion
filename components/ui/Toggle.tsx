'use client';
import React, { useState } from 'react';
import { CheckCheckIcon, UserRoundX } from "lucide-react";

interface ToggleActionProps {
    onToggle: (value: boolean) => Promise<void>;
    WillbeDisabled?: boolean;

}

function ToggleAction({ onToggle,WillbeDisabled = false }: ToggleActionProps) {
    const [action, setAction] = useState(!WillbeDisabled);
    const [isDisabled, setIsDisabled] = useState(WillbeDisabled);

    const handleToggle = async () => {
        if (!isDisabled) {
            try {
                setIsDisabled(true);
                await onToggle(true);
                setAction(false);
            } catch (error) {

                setIsDisabled(false);
                console.error('Error in toggle action:', error);
            }
        }
    };

    return (
        <div
            className={`flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${
                action ? 'bg-red-950 border border-red-800' : 'bg-green-600 border border-green-600'
            }`}
            onClick={!isDisabled ? handleToggle : undefined}
        >
            <div className='flex justify-between items-center w-full'>
                <div
                    className={`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 ${
                        action ? 'transform translate-x-0 bg-red-400' : 'transform translate-x-8 bg-green-600'
                    }`}
                >
                    {action ? (
                        <UserRoundX className='h-4 w-4'/>
                    ) : (
                        <CheckCheckIcon className='h-4 w-4'/>
                    )}
                </div>
                <div
                    className={`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 ${
                        action ? 'bg-transparent' : 'transform -translate-x-8'
                    }`}
                >
                    {action ? (
                        <CheckCheckIcon className='h-4 w-4'/>
                    ) : (
                        <UserRoundX className='h-4 w-4'/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ToggleAction;