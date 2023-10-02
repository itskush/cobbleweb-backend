"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useAppSelector} from "@/redux/hooks";
import Link from "next/link";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
export default function Profile() {
  const user = useAppSelector((state) => state.loginUser);
  const router = useRouter();

  if(!user) {
    router.push("/login");
  }
  
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
            Welcome Back, <span className="text-[#247393]">{user?.fullName ? user?.fullName: 'Unknown'}</span>
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
                    <p className="text-[#247393]">Please Sign In to see your profile</p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  </>
  );
}
