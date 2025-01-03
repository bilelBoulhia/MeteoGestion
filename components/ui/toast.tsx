"use client"

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {X} from 'lucide-react'
import {cn} from "@/utils/cn";


interface ToastProps {
    show: boolean
    message: string

    className?: string
}

export default function Toast({show, message, className}: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (show) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)

            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [show])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{opacity: 0, y: 50, scale: 0.3}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 20, scale: 0.5}}
                    transition={{type: "spring", stiffness: 500, damping: 30}}
                    className={cn("fixed inset-x-0 bottom-0 mx-auto mb-4 w-full max-w-sm",className)}

                >
                    <div className=" m-2 bg-teal-600 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <p className="text-white font-medium">{message}</p>
                            <button
                                onClick={() => {
                                    setIsVisible(false)

                                }}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <X size={20}/>
                            </button>
                        </div>
                        <motion.div
                            initial={{width: "100%"}}
                            animate={{width: "0%"}}
                            transition={{duration: 5, ease: "linear"}}
                            className="h-1 bg-white"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}