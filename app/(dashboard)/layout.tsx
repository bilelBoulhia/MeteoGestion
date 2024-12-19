'use client'

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import {IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt} from "@tabler/icons-react";
import {useState} from "react";
import {cn} from "@/utils/cn";
import {signOutAction} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
          <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
          <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
          <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />
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
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link}/>
                ))}
                <SubmitButton variant={"ghost"} className='inline group bg-black p-0 m-0 w-0' onClick={signOutAction}>
                  <IconArrowLeft className=" inline text-neutral-200  transition-transform duration-300 ease-in-out group-hover:-translate-x-1 h-5 w-5 flex-shrink-0" /> <span className='text-neutral-300 p-1'>Logout</span>
                </SubmitButton>

              </div>
            </div>

          </SidebarBody>
        </Sidebar>
        <Dashboard />

      </div>
  );
}
const Dashboard = () => {
  return (
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl  bg-gradient-to-br from-[hsl(210,80%,10%)] to-[hsl(0,100%,0%)]  flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex gap-2">
s
          </div>
        </div>
      </div>
  );
};