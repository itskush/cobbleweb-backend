import Image from "next/image";
import React, { useState } from "react";
import navBurger from "../../../public/static/icons/pages/dashboard/navburger.svg";
import bell from "../../../public/static/icons/pages/dashboard/bell.svg";
import SidebarMobile from "../Sidebar/SidebarMobile";
import Notification from "../Notification/Notification";
import Profile from "../Profile/Profile";
import { useAppSelector} from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [active, setActive] = useState(true);
  const [activeNotification, setActiveNotification] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeModalContactUs, setActiveModalContactUs] = useState(false);
  const user = useAppSelector((state) => state.loginUser);
  
  const changeActiveHandler = () => {
    setActive(!active);
  };

  const changeActiveNotificationHandler = () => {
    setActiveNotification(!activeNotification);
    setActiveProfile(false);
  };

  const changeActiveProfileHandler = () => {
    setActiveProfile(!activeProfile);
    setActiveNotification(false);
  };

  const changeActiveModalContactUsHandler = () => {
    setActiveModalContactUs(!activeModalContactUs);
    setActiveProfile(false);
  };

  return (
    <>
      <div className="flex justify-between items-center py-4 pl-[10px] pr-[24px] lg:pr-[40px] border-b border-[#F6F6F6] relative">
        <div
          className="p-4 lg:p-[18px] cursor-pointer"
          onClick={changeActiveHandler}
        >
          <Image
            className="lg:hidden"
            src={navBurger}
            alt="nav"
            width={24}
            height={24}
            priority
          />
        </div>
        <div className="flex gap-4">
          <div
            className="p-4 lg:p-[18px] cursor-pointer"
            onClick={changeActiveNotificationHandler}
          >
            <Image src={bell} alt="nav" width={24} height={24} priority />
          </div>
          <div className="cursor-pointer" onClick={changeActiveProfileHandler}>
            <Image src={user?.avatar} alt="Profile Pic" width={60} height={60} priority />
          </div>
        </div>
        <Notification activeNotification={activeNotification} />
        <Profile activeProfile={activeProfile} />
      </div>
      <SidebarMobile
        changeActiveHandler={changeActiveHandler}
        active={active}
      />
    </>
  );
}
