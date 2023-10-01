import React, { useState } from "react";
import Image from "next/image";
import user from "../../../public/static/images/pages/dashboard/user.png";
import support from "../../../public/static/icons/pages/dashboard/support.svg";
import help from "../../../public/static/icons/pages/dashboard/help.svg";
import followus from "../../../public/static/icons/pages/dashboard/followus.svg";

export default function Profile({ activeProfile }: any) {
  const [activeModalContactUs, setActiveModalContactUs] = useState(false);
  const [activeModalFollowUs, setActiveModalFollowUs] = useState(false);

  const changeActiveModalFollowUsHandler = () => {
    setActiveModalFollowUs(!activeModalFollowUs);
  };
  const changeActiveModalContactUsHandler = () => {
    setActiveModalContactUs(!activeModalContactUs);
  };
  return (
    <>
      <div
        className={`absolute w-[290px] h-[238px] flex-col card-auth border-[#1e1e1e] z-10 bg-white top-[92px] right-[24px] sm:right-[40px] ${
          activeProfile ? "flex" : "hidden"
        }`}
      >
        <div className="p-4 flex gap-[10px] items-center cursor-pointer">
          <Image src={user} alt="nav" width={38} height={38} priority />
          <div className="w-full">
            <h3 className="text-14 font-bold">Sarah Douglas</h3>
            <p className="text-[#6B6C76] text-11 font-bold">
              Sarah.douglas@gmail.com
            </p>
          </div>
        </div>
        <div
          className="py-4 px-5 flex gap-[16px] items-center cursor-pointer"
          onClick={changeActiveModalContactUsHandler}
        >
          <Image src={support} alt="nav" width={16} height={16} priority />
          <div className="w-full">
            <h3 className="text-14 font-bold">Support</h3>
          </div>
        </div>
        <div className="py-4 px-5 flex gap-[16px] items-center cursor-pointer">
          <Image src={help} alt="nav" width={16} height={16} priority />
          <div className="w-full">
            <h3 className="text-14 font-bold">Help</h3>
          </div>
        </div>
        <div
          className="py-4 px-5 flex gap-[16px] items-center cursor-pointer"
          onClick={changeActiveModalFollowUsHandler}
        >
          <Image src={followus} alt="nav" width={16} height={16} priority />
          <div className="w-full">
            <h3 className="text-14 font-bold">Follow Us</h3>
          </div>
        </div>
      </div>
    </>
  );
}
