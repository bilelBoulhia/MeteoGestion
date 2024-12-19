'use client';
import { Label } from "@/components/ui/label";

import { signInAction } from "@/app/actions";

import { SubmitButton } from "@/components/submit-button";
import {Sun, CloudRain, Moon, Cloud} from 'lucide-react'
import FadeBlurInput from "@/components/ui/Cool-input";
import { FaUserAlt } from "react-icons/fa";
import { PiPasswordLight } from "react-icons/pi";
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";

export default  function Login() {
    return (


        <div className="flex flex-row justify-center  items-center min-h-screen">

            <div
                id='screen-1'
                className='min-h-screen gap-[5px] flex-col w-[40%] justify-center items-center flex relative'>


                <div>

                    <Label
                        className='text-xl text-white min-w-[270px] font-bold  text-center  uppercase tracking-wide inline-block  pb-1'>
                        Tableau de bord <span
                        className="text-transparent font-extrabold bg-clip-text bg-blue-200 ">administrateur</span>
                    </Label>
                </div>
                <div className='w-[320px] sm:w-[400px] p-[2rem] relative flex flex-col'>
                    <form className='justify-center gap-9 flex-col flex'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className='text-gray-300 p-2 font-medium'>Nom d'utilisateur</Label>
                            <FadeBlurInput name="email" required Icon={FaUserAlt} placeholder='Entrez votre nom'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className='text-gray-300 p-2 font-medium'>Mot de pass</Label>
                            <FadeBlurInput name="password" required Icon={PiPasswordLight}
                                           placeholder='Entrez votre mot de passe'/>
                        </div>

                        <SubmitButton
                            className='px-6 py-3 bg-blue-100

                            text-neutral-600 font-semibold

                             rounded-xl shadow-md
                             transition-all duration-300 ease-in-out
                             hover:shadow-lg hover:-translate-y-0.5
                             focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
                            pendingText="Signing In..." formAction={signInAction}>
                            <Cloud className="w-5 h-5 "/>
                            <span className='px-3'>Sign-in</span>
                        </SubmitButton>
                        {/*<FormMessage message={searchParams} />*/}
                    </form>
                </div>
            </div>
            <div className="hidden lg:block w-[2px] min-h-screen relative">
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] clip-path-diamond bg-gradient-to-b from-transparent via-blue-200/50 to-transparent"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] blur-sm bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
                <div
                    className="absolute inset-0 w-full h-[98%] top-[1%] animate-pulse bg-gradient-to-b from-transparent via-blue-100/20 to-transparent"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                    }}
                />
            </div>

            <div id='screen-2' className='hidden relative lg:block min-h-screen  w-[60%]'>

                <div
                    className="min-h-screen relative  w-full overflow-hidden  flex flex-col items-center justify-center">
                    <div
                        className='absolute top-1/2 text-center left-1/2 translate-x-[-50%] translate-y-[-50%] w-full z-20'>
                        <div className="flex flex-col items-center justify-center p-4">


                            <h1 className="text-6xl  font-bold tracking-wider bg-blue-200 bg-clip-text text-transparent">
                                <span>Meteo </span>{" "}
                                <span>Algerie</span>
                            </h1>
                            <div
                                className="mt-4 text-md font-medium uppercase tracking-[0.5em] bg-blue-400 bg-clip-text text-transparent">
                                office National de la Meteorologie
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 w-full h-full bg-gray-800   [mask-image:radial-gradient(circle,transparent_45%,#000_60%,transparent_70%)] animate-pulse pointer-events-none"/>


                </div>
                <BackgroundBeamsWithCollision/>
            </div>

        </div>
    )
        ;
}