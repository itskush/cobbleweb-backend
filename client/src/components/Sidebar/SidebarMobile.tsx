import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { PURGE } from 'redux-persist';

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
import x from "../../../public/static/icons/pages/dashboard/x.svg";
import logo from "../../../public/static/icons/logo.svg";
import Image from "next/image";

const dashboardRoutes = [
  {
    title: "Dashboard",
    nav: "/dashboard",
    icon: home,
  },
  {
    title: "Browse",
    nav: "/browse",
    icon: browse,
  },
  {
    title: "Explore",
    nav: "/explore",
    icon: explore,
  },
  {
    title: "Posts",
    nav: "/posts",
    icon: posts,
  },

  {
    title: "Messages",
    nav: "/messages",
    icon: messages,
  },

  {
    title: "Supporters",
    nav: "/supporters",
    icon: supporters,
  },
  {
    title: "Payouts",
    nav: "/payouts",
    icon: payouts,
  },
];

export default function SidebarMobile({ changeActiveHandler, active }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  
  const logoutUser = async () => {
    await dispatch({
      type: PURGE,
      result: () => null,
    });
    router.push('/login')
  }

  return (
    <>
      <div
        className={`fixed overflow-auto ${
          active ? "-left-[70%] " : " left-[0%]"
        } transition-all flex duration-300 lg:hidden w-[70%] top-0 flex-col z-50 h-screen scr`}
      >
        <div className="flex flex-col flex-grow bg-white pb-4 overflow-y-auto gap-y-5">
          <div className="flex flex-shrink-0 items-center h-16 px-6">
            <Image
              className="w-[17.385px] h-[25.872px] max-w-full"
              src={logo}
              alt="logo"
            />
            <h3 className="ml-1 text-20 font-medium text-[#131313]">Shtem</h3>
          </div>
          <nav className="flex flex-col flex-1">
            <ul className="flex flex-col flex-1 gap-y-2 text-[#131313] font-medium cursor-pointer px-2">
              {dashboardRoutes.map((item, index) => {
                return (
                  <li
                    className={
                      pathname == item.nav
                        ? `flex justify-between items-center p-2 text-sm font-semibold leading-6 bg-[#F4C247] rounded-md`
                        : `flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#BABABA]`
                    }
                    onClick={() => {
                      router.push(item.nav);
                      changeActiveHandler();
                    }}
                    key={index}
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
              <li
                className={`flex justify-between items-center p-2 text-sm font-semibold leading-6 text-[#6d6d6d] cursor-pointer`}
                onClick={() => {}}
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
              </li>
              <li
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
              </li>
              <li
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
              </li>
            </ul>
          </nav>
          <div className="px-2">
            <div
              className="btn-primary flex items-center p-2 cursor-pointer"
              onClick={changeActiveHandler}
            >
              <div className="p-2 mr-[10px]">
                <Image
                  className={`w-[16px] h-[16px] max-w-full`}
                  src={x}
                  alt="logo"
                />
              </div>
              Close Navigation
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed ${
          active ? "-left-[100%] bg-opacity-0" : "right-[0%] bg-opacity-50"
        } transition-all duration-300 lg:hidden w-[100%] bg-black h-screen top-0 z-40 `}
        onClick={changeActiveHandler}
      ></div>
    </>
  );
}
