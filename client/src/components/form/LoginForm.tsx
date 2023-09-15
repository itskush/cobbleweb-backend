'use client'
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import Image from "next/image";
import { loginUser } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '../../redux/slices/authSlice';
import { store } from '../../redux/store';
type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<LoginData>();
  const dispatch = useDispatch()
  // for password show hide
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // get functions to build form with useForm() hook
 
  const onSubmit = async (data: LoginData)  => {
    try {
      const response =  await loginUser(data);
      if (response.status == 200 ) {
        await dispatch(setAccessToken(response))
        router.push('/profile')
      }
      // Set user in state
    } catch (error) {
      console.error(error);
      // set form error state 
    }
  };

  return (
    <>
     <form className="user-data-form" onSubmit={handleSubmit(onSubmit)}>
     <div className="row">
          <div className="md:w-full px-3 mb-[1rem]">
            <div className="md:w-full px-3 mb-6 md:mb-0">
              <div className="block uppercase tracking-wide text-black text-xs font-bold mb-2">
                <label>Email</label>
                <input
                  id="grid-email" 
                  placeholder="Enter Your Email"
                  type="text"
                  {...register("email", { required: true })}
                  className="appearance-none block !w-[100%] bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3"
                />

                {errors.email && (
                  <div className="invalid-feedback">Email required</div>
                )}
              </div>
            </div>
          </div>
         
          <div className="mx-3 md:flex mb-">
            <div className="md:w-full px-3 mb-6 md:mb-0">
            <div className="block uppercase tracking-wide text-black text-xs font-bold mb-2">
              <label>Password</label>
              <input
                id="grid-password" 
                placeholder="Enter Password"
                type={passwordShown ? "text" : "password"}
                {...register("password" , { required: true })}
                className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  Password required
                </div>
              )}
              {/* End error msg */}
              {/* <span
                className="placeholder_icon"
                onClick={togglePasswordVisiblity}
              >
                <span
                  className={
                    passwordShown ? "passVicon eye-slash" : "passVicon"
                  }
                >
                  <Image  width="24" height="16"  src="/images/icon/view.svg" alt="image" />
                </span>
              </span> */}
              {/* End placeholder icon */}
              </div>
            </div>
          </div>
          <div className="flex justify-center p-2 col-12">
            <button type="submit" className="flex text-center justify-center items-center relative inline-flex px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-yellow-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-yellow-400"></span>
              <span className="relative text-black group-hover:text-black">Sign In</span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
