'use client'
import Image from "next/image";
import banner from "../../../../public/static/images/pages/auth/banner_signin.png";
import logo from "../../../../public/static/icons/logo.svg";
import eye from "../../../../public/static/icons/eye.svg";
import apple from "../../../../public/static/icons/brands/apple.svg";
import google from "../../../../public/static/icons/brands/google.svg";

import { ReactNode, use, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { useForm } from "react-hook-form";
import { loginUser, getUserProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { setLoginUser, setUser } from '@/redux/user';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { store } from '@/redux';
import toast from 'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginData } from "@/types/";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});


export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginData)  => {
    try {
      const response =  await loginUser(data);
      if (response.status == 200 ) {
        await dispatch(setUser(response))
        const token = store.getState().user.access_token
        const user =  await getUserProfile(token);
        if (user)
        {
          await dispatch(setLoginUser(user))
          router.push('/profile')
        } else {
          toast.error('There was an error, please try again later')
        }
       
      }
    } catch (error : any) {
      toast.error(error.message)
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="flex  h-[1024px]">
      <div className="hidden  w-[60%] lg:flex flex-col justify-center items-center bg-[#F4FEFB]  ">
        <Image
          className="mb-6"
          src={banner}
          alt="banner login"
          width={552}
          height={387}
          priority
        />
        <h2 className="text-40 font-semibold">Keep Up The Good Work!</h2>
      </div>
      <div className="w-full flex flex-col py-[64px] px-[24px] lg:w-[40%] lg:px-[70px]">
        <div className="w-full justify-center flex gap-[8px]">
          <Image className="" src={logo} alt="banner login" priority />
          <h3 className="text-42">Shtem</h3>
        </div>
        <div className="mt-[63.5px]">
          <div className="text-center">
            <h1 className="text-40 font-semibold mb-[6px]">Sign In</h1>
            <p className="text-[#6D6D6D]">Welcome Back!</p>
          </div>
          <form className="flex flex-col gap-[32px] my-[32px]" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="text-14 text-[#6D6D6D] mb-[8px] p-2">
                Email Address
              </p>
              <input
                className="w-full p-6 border border-[#131313] rounded-sm placeholder:text-[#131313]"
                type="text"
                placeholder="john.doe@gmail.com"
                {...register("email", { required: true })}
              />
               {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email required</p>
                )}
            </div>
            <div>
              <p className="text-14 text-[#6D6D6D] mb-[8px] p-2">Password</p>
              <div className="flex border border-[#131313] rounded-sm p-6">
                <input
                  className="w-full  border-none  placeholder:text-[#131313]"
                  type={passwordVisible ? "text" : "password"}
                  id="pw"
                  placeholder="password"
                  {...register("password" , { required: true })}
                />
                <Image
                  className="ml-[24px] cursor-pointer"
                  src={eye}
                  alt="banner login"
                  priority
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password required
                </p>
                )}
            </div>
            <button className="btn-primary w-full" type="submit">
              Sign In
            </button>
          </form>
          <div>
            <div className="mb-8">
              <p className="text-14 font-medium text-[#95762B] text-center">
                Forgot Password?
              </p>
            </div>
            <div className="flex w-full items-center">
              <hr className="bg-[#BABABA] flex-1" />
              <p className="flex justify-center mx-[10px] flex-1 text-11 text-[#6D6D6D] whitespace-nowrap">
                Or Sign In Using
              </p>
              <hr className="bg-[#BABABA] flex-1" />
            </div>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 btn-outline flex justify-center items-center">
                <Image
                  className="mr-2"
                  src={apple}
                  alt="banner login"
                  priority
                />
                Apple
              </button>
              <button className="flex-1 btn-outline flex justify-center items-center">
                <Image
                  className="mr-2"
                  src={google}
                  alt="banner login"
                  priority
                />
                Sign Up
              </button>
            </div>
            <div className="mt-[79.5px] lg:mt-[92px]">
              <p className="text-[#131313] text-center">
                Don’t have an account?
                <br />
                <Link className="text-[#599483]" href="/register">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Signin.getLayout = function (page: ReactNode) {
  return <Layout>{page}</Layout>;
};
