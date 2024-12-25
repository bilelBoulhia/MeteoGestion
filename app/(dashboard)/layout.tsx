'use client'

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import {IconArrowLeft, IconPigMoney, IconServicemark, IconSettings, IconUserBolt} from "@tabler/icons-react";
import { useState} from "react";
import {cn} from "@/utils/cn";
import {signOutAction} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";
import Providers from "@/app/providers";

import {BanknoteIcon, Files, WorkflowIcon} from "lucide-react";
import {BiGitPullRequest} from "react-icons/bi";
import BackgroundSun from "@/components/ui/backgroundSun";





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  const links = [
    {
      label: "Pointage",
      href: "/Pointage",
      icon: (
          <IconUserBolt className="text-neutral-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Service Personnal",
      href: "/ServicePersonnal",
      icon: (
          <WorkflowIcon className="text-neutral-800 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Les Demandes",
      href: "/Demandes",
      icon: (
          <BiGitPullRequest className="text-neutral-800 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Les Documents",
      href: "/Documents",
      icon: (
          <Files className="text-neutral-800 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Management de salaire",
      href: "/Salaire",
      icon: (
          <BanknoteIcon className="text-neutral-800 h-5 w-5 flex-shrink-0" />
      ),
    },

  ];
  const [open, setOpen] = useState(false);




  return (
      <div
          className={cn(
              "rounded-md flex flex-col md:flex-row   w-full flex-1  mx-auto  overflow-hidden",
              "h-screen"
          )}
      >

        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between  gap-10">
            <div className="flex flex-col flex-1   overflow-x-hidden">
              <BackgroundSun/>
              <div style={{zIndex:50}} className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link}/>
                ))}
                <SubmitButton variant={"ghost"} className='inline group bg-black p-0 m-0 w-0' onClick={signOutAction}>
                  <IconArrowLeft className=" inline text-neutral-800  transition-transform duration-300 ease-in-out group-hover:-translate-x-1 h-5 w-5 flex-shrink-0" /> <span className='text-neutral-800 p-1'>Logout</span>
                </SubmitButton>

              </div>
            </div>

          </SidebarBody>
        </Sidebar>
        <Dashboard  children={children} />

      </div>
  );
}
const Dashboard = ({
                     children,
                   }: {
  children: React.ReactNode;
}) => {
  return (
      <div className="flex relative min-h-full overflow-auto bg-[#F8FAFC] rounded-tl-2xl shadow-2xl  flex-1">
        <div className="      flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex p-5  gap-2">

            <Providers>{children}</Providers>
          </div>
        </div>
      </div>
  );
};