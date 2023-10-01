import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { PURGE } from 'redux-persist';

import React from "react";
import logo from "../../../public/static/icons/logo.svg";
import Image from "next/image";
import home from "../../../public/static/icons/pages/dashboard/home.svg";
import arrow from "../../../public/static/icons/pages/dashboard/arrow.svg";
import browse from "../../../public/static/icons/pages/dashboard/browse.svg";
import explore from "../../../public/static/icons/pages/dashboard/explore.svg";
import posts from "../../../public/static/icons/pages/dashboard/posts.svg";
import messages from "../../../public/static/icons/pages/dashboard/messages.svg";
import supporters from "../../../public/static/icons/pages/dashboard/supporters.svg";
import payouts from "../../../public/static/icons/pages/dashboard/payouts.svg";
import settings from "../../../public/static/icons/pages/dashboard/settings.svg";
import switchaccount from "../../../public/static/icons/pages/dashboard/switchaccount.svg";
import logout from "../../../public/static/icons/pages/dashboard/logout.svg";

const navList = [
  {
    title: "Profile",
    nav: "/profile",
    icon: home,
  },
  {
    title: "Browse",
    nav: "#",
    icon: browse,
  },
  {
    title: "Explore",
    nav: "#",
    icon: explore,
  },
  {
    title: "Posts",
    nav: "#",
    icon: posts,
  },

  {
    title: "Messages",
    nav: "#",
    icon: messages,
  },

  {
    title: "Supporters",
    nav: "#",
    icon: supporters,
  },
  {
    title: "Payouts",
    nav: "#",
    icon: payouts,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  
  const logoutUser = async () => {
    await dispatch({
      type: PURGE,
      result: () => null,
    });
    router.push('/login')
  }

  return (
    <div className="hidden border-r-[1px] border-[#F6F6F6] lg:flex lg:w-[18rem] lg:flex-col lg:z-50 lg:top-0 lg:bottom-0 lg:fixed overflow-auto">
      <div className=" flex flex-col flex-grow bg-[#fff] pb-4 px-6 overflow-y-auto justify-between">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-shrink-0 items-center h-16">
            <Image
              className="w-[17.385px] h-[25.872px] max-w-full"
              src={logo}
              alt="logo"
            />
            <h3 className="ml-1 text-20 font-medium text-[#131313]">Shtem</h3>
          </div>
          <nav className="flex flex-col flex-1">
            <ul className="flex flex-col flex-1 gap-y-2 text-[#131313] font-medium cursor-pointer">
              {navList.map((item, index) => {
                return (
                  <li
                    className={
                      pathname == item.nav
                        ? `flex justify-between items-center p-2 text-sm font-semibold leading-6 bg-[#F4C247] rounded-md`
                        : `flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#BABABA]`
                    }
                    key={index}
                    onClick={() => router.push(item.nav)}
                  >
                    <div className="flex items-center gap-x-4">
                      <Image
                        className={`w-[16px] h-[16px] max-w-full ${
                          pathname != item.nav && "text-nav-inactive"
                        }`}
                        src={item.icon}
                        alt="logo"
                      />
                      {item.title}
                    </div>
                    <Image
                      className={`w-[16px] h-[16px] max-w-full ${
                        pathname != item.nav && "text-nav-inactive"
                      }`}
                      src={arrow}
                      alt="logo"
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className={`flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#6d6d6d] cursor-pointer`}
            onClick={() =>{}}
          >
            <div className="flex items-center gap-x-4">
              <Image
                className={`w-[16px] h-[16px] max-w-full text-6d6d6d`}
                src={settings}
                alt="logo"
              />
              Settings
            </div>
            <Image
              className={`w-[16px] h-[16px] max-w-full text-6d6d6d`}
              src={arrow}
              alt="logo"
            />
          </div>
          <div
            className={`flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#6d6d6d] cursor-pointer`}
            onClick={() => {}}
          >
            <div className="flex items-center gap-x-4">
              <Image
                className={`w-[16px] h-[16px] max-w-full text-6d6d6d`}
                src={switchaccount}
                alt="logo"
              />
              Switch Account
            </div>
            <Image
              className={`w-[16px] h-[16px] max-w-full text-6d6d6d`}
              src={arrow}
              alt="logo"
            />
          </div>
          <div
            className={`flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#3a3a3a] cursor-pointer`}
            onClick={() => logoutUser()}
          >
            <div className="flex items-center gap-x-4">
              <Image
                className={`w-[16px] h-[16px] max-w-full text-3a3a3a`}
                src={logout}
                alt="logo"
              />
              Log Out
            </div>
            <Image
              className={`w-[16px] h-[16px] max-w-full text-3a3a3a`}
              src={arrow}
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
