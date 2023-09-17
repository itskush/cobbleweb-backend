'use client'
import React from "react";
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { loginUser, getUserProfile } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { setAccessToken, setUser } from '../../redux/slices/authSlice';
import { store } from '../../redux/store';
import toast from 'react-hot-toast';
type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<LoginData>();

  const dispatch = useDispatch()

  const onSubmit = async (data: LoginData)  => {
    try {
      const response =  await loginUser(data);
      if (response.status == 200 ) {
        await dispatch(setAccessToken(response))
        const token = store.getState().auth.token
        const user =  await getUserProfile(token);
        await dispatch(setUser(user))
        router.push('/profile')
      }
    } catch (error : any) {
      toast.error(error.message)
    }
  };

  return (
    <>
     <form className="user-data-form" onSubmit={handleSubmit(onSubmit)}>
     <div className="row">
          <div className="md:w-full px-3 mb-[1rem]">
            <div className="md:w-full px-3 mb-6 md:mb-0">
              <div className="block uppercase tracking-wide text-black text-xs mb-2">
                <label  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" >Email</label>
                <input
                  id="grid-email" 
                  placeholder="Enter Your Email"
                  type="text"
                  {...register("email", { required: true })}
                  className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1"
                />

                {errors.email && (
                  <div className="invalid-feedback">Email required</div>
                )}
              </div>
            </div>
          </div>
         
          <div className="mx-3 md:flex mb-">
            <div className="md:w-full px-3 mb-6 md:mb-0">
            <div className="block uppercase tracking-wide text-black text-xs mb-2">
              <label  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" >Password</label>
              <input
                id="grid-password" 
                placeholder="Enter Password"
                type="password"
                {...register("password" , { required: true })}
                className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  Password required
                </div>
              )}
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
        </div>
      </form>
    </>
  );
};

export default LoginForm;
