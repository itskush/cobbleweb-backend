'use client'
import Image from "next/image";
import banner from "../../../../public/static/images/pages/auth/banner_signup.png";
import logo from "../../../../public/static/icons/logo.svg";
import eye from "../../../../public/static/icons/eye.svg";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/api";
import { useRouter } from 'next/navigation';
import toast from'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector } from "@/redux/hooks";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(25, "First Name must not exceed 25 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(25, "Last Name must not exceed 25 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(/[0-9]/, "Password must contain at least 1 number"),
  photos: yup
    .mixed()
    .test("fileRequired", "At least 4 photo are required", (value: any) => {
      return value?.length >= 4;
    }),
});
export default function Signup() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [active, setActive] = useState(true)
  if (user.access_token !== '')
  {
    router.push('/profile')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  
  const onSubmit = async (formData: any) => {
    await setActive(!active);
    try {
      const response = await registerUser(formData);
      if (response.error) {
        toast.error(response.error);
        await setActive(!active);
      } else {
        router.push('/success');
      }
    }
    catch (error : any) {
      toast.error(error.message)
      console.log(error)
      await setActive(!active);
    }
  };

  return (
    <main className="flex  h-[1024px]">
      <div className="hidden  w-[60%] lg:flex flex-col justify-center items-center bg-[#FEF9ED]  ">
        <Image
          className="mb-6"
          src={banner}
          alt="banner login"
          width={552}
          height={387}
          priority
        />
        <h2 className="text-40 font-semibold">Start Your Journey With Us</h2>
      </div>
      <div className="w-full flex flex-col py-[24px] px-[24px] lg:w-[40%] lg:px-[70px]">
        <div className="w-full justify-center flex gap-[8px]">
          <Image className="" src={logo} alt="banner login" priority />
          <h3 className="text-42">Shtem</h3>
        </div>
        <div className="mt-[10.5px]">
          <div className="text-center">
            <h1 className="text-40 font-semibold mb-[6px]">Sign Up</h1>
            <p className="text-[#6D6D6D]">Welcome to Platform!</p>
          </div>
          <form className="flex flex-col gap-[8px] my-[10px]" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="text-14 text-[#6D6D6D] mb-[4px] p-2">
                Firstname
              </p>
              <input
                className="w-full p-6 border border-[#131313] rounded-sm placeholder:text-[#131313]"
                type="text"
                placeholder="Ankush"
                {...register("firstName",  { required: true, minLength: 2, maxLength: 25 })} 
              />
              {errors.firstName && <p></p>}
              {errors.firstName && (
                     <p className="text-red-500 text-sm mt-1">Min 2 characters</p>
                )}
            </div>
            <div>
              <p className="text-14 text-[#6D6D6D] mb-[8px] p-2">
                Lastname
              </p>
              <input
                className="w-full p-6 border border-[#131313] rounded-sm placeholder:text-[#131313]"
                type="text"
                placeholder="Presley"
                {...register("lastName",  { required: true, minLength: 2, maxLength: 25 })} 
              />
              {errors.lastName && <p></p>}
              {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">Min 2 characters</p>
              )}
            </div>

            <div>
              <p className="text-14 text-[#6D6D6D] mb-[8px] p-2">
                Email
              </p>
              <input
                className="w-full p-6 border border-[#131313] rounded-sm placeholder:text-[#131313]"
                type="text"
                placeholder="john.doe@gmail.com"
                {...register("email")}
              />
              {errors.email && <p></p>}
              {errors.email && (
                   <p className="text-red-500 text-sm mt-1">Required and in correct format</p>
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
                  {...register("password")}
                />
                <Image
                  className="ml-[24px] cursor-pointer"
                  src={eye}
                  alt="banner login"
                  priority
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            {errors.password && (<p className="text-red-500 text-sm mt-1">At least 6 characters and contain 1 number</p>)}
            <div>
              <p className="text-14 text-[#6D6D6D] mb-[8px] p-2">
                Photos
              </p>
              <input
                className="w-full p-6 border border-[#131313] rounded-sm placeholder:text-[#131313]"
                type="file"
                id="photos"
                accept="image/*"
                {...register("photos")}
                multiple
              />
               {errors.photos && (
                  <p className="text-red-500 text-sm mt-1">
                    Please upload at least 4 photos
                  </p>
                )}
            </div>
            <div className="flex">
              <input
                className="checkbox-bg-black w-[24px] h-[24px]"
                type="checkbox"
              />
              <p className="ml-2 text-14 font-medium text-[#131313]">
                I Accept The{" "}
                <span className="text-[#66AA97]">Terms & Conditions</span>
              </p>
            </div>
            <button className={`btn-primary w-full ${active ?'' : 'btn-primary w-full bg-gray-300'}`} type="submit" disabled={!active}>
              Sign Up
            </button>
          </form>
          <div>
            <div className="mt-[10.5px] lg:mt-[5px]">
              <p className="text-[#131313] text-center">
                Have an account?{" "}
                <Link className="text-[#599483]" href="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Signup.getLayout = function (page: ReactNode) {
  return <Layout>{page}</Layout>;
};
