"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useAppSelector} from "@/redux/hooks";
import Link from "next/link";
import React, { useState } from "react";
import Head from "next/head";

export default function Profile() {
  const user = useAppSelector((state) => state.loginUser);
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>Dashboard</title>
      <meta property="og:title" content="Dashboardd" key="title" />
    </Head>

    <div className="container-dashboard flex flex-col items-center justify-center gap-4">
        <div className="flex justify-between items-center gap-4">
          <p className="text-18 font-medium text-[#131313]">
            Welcome Back, <span className="text-[#247393]">{user?.fullName}</span>
          </p>
        </div>
        <div className="flex justify-between mx-auto my-auto px-0 ">
          <div className="lg:flex">
            <div className="lg:w-[100%] py-12 lg:px-8">
            {user.photos ? (
                <Carousel>
                  {user.photos.map((data: any, index: number) => (
                    <div className="max-h-[600px]" key={index}>
                      <img  className="max-w-[600px]"src={data?.url} alt={data?.name} />
                      <p className="legend">{data?.name}</p>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <>
                  <Link href="/login" className="mb-5">
                    Go Back
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    {/* <div className="flex flex-col h-screen min-w-50">
      <div className="bg-white-700 shadow-lg p-4 bg-white/50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={`${user?.avatar}`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-black font-black">{user?.fullName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center ">
        <div className="bg-white shadow-md rounded-lg max-w-md w-full">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-col items-center">
              {user.photos ? (
                <Carousel>
                  {user.photos.map((data: any, index: number) => (
                    <div  className="flex justify-center align-center mx-auto w-[50%] md:w-full"  key={index}>
                      <img  src={data?.url} alt={data?.name} />
                      <p className="legend">{data?.name}</p>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <>
                  <Link href="/login" className="mb-5">
                    Go Back
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </>
  );
}
