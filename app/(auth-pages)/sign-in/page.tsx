'use client';
import { Label } from "@/components/ui/label";
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Sun, CloudRain, Moon, Cloud } from 'lucide-react'
import FadeBlurInput from "@/components/ui/Cool-input";
import { FaUserAlt } from "react-icons/fa";
import { PiPasswordLight } from "react-icons/pi";
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";
import Image from "next/image";
import logo from "@/app/assests/logo.webp";
import {DotBackground} from "@/components/ui/GridBackground";
import BackgroundSun from "@/components/ui/backgroundSun";
import {useState} from "react";

export default function Login() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex flex-row justify-center  items-center min-h-screen">
            <BackgroundSun/>
            <div
                id='screen-1'
                className='min-h-screen gap-[5px] flex-col w-[40%] justify-center items-center flex relative'>
                <div>
                    <Label
                        className='text-xl text-black min-w-[270px] font-bold text-center uppercase tracking-wide inline-block pb-1'>
                        Tableau de bord <span
                        className=" font-bold uppercase  bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 p-2 rounded-xl text-transparent bg-clip-text">administrateur</span>
                    </Label>
                </div>
                <div className='w-[320px] sm:w-[400px] p-[2rem] mt-3 relative flex flex-col'>
                    <form className='justify-center gap-[2rem] flex-col flex'>
                        <div className='flex flex-col gap-2'>
                            {/*<Label className='text-gradient-primary p-2 font-bold text-black '>Nom d'utilisateur</Label>*/}
                            <FadeBlurInput name="email" required className=' shadow-[6px_6px_12px_rgba(0,0,0,0.25),-6px_-6px_12px_rgba(255,255,255,0.3)]' Icon={FaUserAlt} placeholder='Entrez votre nom'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {/*<Label htmlFor="password" className='p-2 font-bold  text-black'>Mot de pass</Label>*/}
                            <FadeBlurInput className='shadow-[6px_6px_12px_rgba(0,0,0,0.25),-6px_-6px_12px_rgba(255,255,255,0.3)]' name="password" required Icon={PiPasswordLight}
                                           placeholder='enter votre mot de pass'/>
                        </div>

                        <SubmitButton
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className='px-6 py-3
                            mt-[2rem]
                            bg-blue-400
                            text-white font-semibold
                            rounded-xl
                            shadow-[6px_6px_12px_rgba(0,0,0,0.25),-6px_-6px_12px_rgba(255,255,255,0.3)]
                           hover:bg-blue-400
                            transition-all duration-300 ease-in-out
                            hover:shadow-lg hover:-translate-y-0.5
                            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50'
                            pendingText="Signing In..." formAction={signInAction}>
                            {isHovered ?   <CloudRain className="w-5 h-5" /> : <Cloud className="w-5 h-5"/> }
                            <span className='px-3'>Sign-in</span>
                        </SubmitButton>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block w-[2px] min-h-screen relative">
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] clip-path-diamond bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-100"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] blur-sm bg-gradient-to-b from-yellow-200/50 via-amber-400/50 to-yellow-200/50"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] animate-pulse bg-gradient-to-b from-yellow-100/30 via-amber-300/30 to-yellow-100/30"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
            </div>

            <div id='screen-2' className='hidden relative lg:block min-h-screen  w-[60%]'>
                <DotBackground/>
                <div
                    className="min-h-screen relative w-full overflow-hidden flex flex-col items-center justify-center">
                    <div
                        className='absolute top-1/2 text-center left-1/2 translate-x-[-50%] translate-y-[-50%] w-full z-20'>
                        <div className="flex flex-col items-center justify-center p-4">

                            {/*<Image src={logo} alt='logo' className='h-[5rem] w-auto'/>*/}

                            <h1
                                className="text-6xl font-bold tracking-wider inline-flex gap-4 justify-center items-center "
                                style={{
                                    background: 'linear-gradient(45deg,#1F8CB7, #563689,#DF290C, #FDD011 )',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',

                                    fontSize: '48px',
                                    fontWeight: 'bold',
                                }}
                            >

                               <span className='inline-flex items-center justify-center '>
                                   <span>Meteo</span>
                                   <span><Image src={logo} alt='logo' className='h-[3rem]  px-4 w-auto'/></span>
                                   {" "}
                                   <span className=''>Algerie</span>
                               </span>


                            </h1>

                            <div
                                className="mt-4 text-md font-medium uppercase tracking-[0.5em] bg-gradient-to-r from-blue-500 shadow-[6px_6px_12px_rgba(0,0,0,0.25),-6px_-6px_12px_rgba(255,255,255,0.3)] via-purple-500 to-orange-400 p-2 rounded-xl text-white">
                                office National de la Meteorologie
                            </div>
                        </div>
                    </div>
                </div>
                <DotBackground/>
            </div>
        </div>
    );
}

