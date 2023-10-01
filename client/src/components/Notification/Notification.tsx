import React from "react";
import Image from "next/image";
import notification from "../../../public/static/images/pages/dashboard/notification.png";

export default function Notification({
  changeActiveNotificationHandler,
  activeNotification,
}: any) {
  return (
    <div
      className={`absolute w-[290px] h-[238px] justify-center items-center card-auth border-[#1e1e1e] z-10 bg-white top-[92px] right-[24px] sm:right-[112px] ${
        activeNotification ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 flex flex-col justify-center items-center">
        <Image src={notification} alt="nav" width={132} height={92} priority />
        <h3 className="text-14 font-medium">Notifications</h3>
        <p className="text-[#6B6C76] text-11">Nothing to see here for now!</p>
      </div>
    </div>
  );
}
