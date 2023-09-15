'use client'

import React, { useEffect, useState} from "react";
import { useForm, Controller } from 'react-hook-form';
import Image from "next/image";
import PreviewImages from "../PreviewImages";
import classNames from "classnames";
import { registerUser } from '../../lib/api';
import { useRouter } from 'next/navigation';


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: FileList | File[] | null;
};

const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // for password show hide

  const [images, setImages] = useState<File[]>([]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = Array.from(e.target.files);
        setImages(images); // Set the images state variable
    }
  };
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // for Re password show hide
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePasswordVisiblity = () => {
    setRePasswordShown(rePasswordShown ? false : true);
  };
  


  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)
    if(!data.photos || data.photos.length < 4) return setErrorMessage("At least 4 images are required");
    if (data.photos) {
      // 1. covert to File[] using Array.from
      const files: File[] = Array.from(data.photos);
      // 2. now you can use array methods on files;
      const filenames = files.map((file) => file);
      data.photos = filenames;
    }
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);

    // Append each photo
    Array.from(data.photos).forEach((photo) => {
      formData.append('photos', photo);
    });

    const response = await registerUser(formData);
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      // redirect to success page
      router.push('/success');
    }
    // console.log(response);
  };

  return (
    <>
      <form className="user-data-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

        <div className="md:w-full px-3 mb-[1rem]">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" htmlFor="grid-first-name">
            First Name
          </label>
          <input 
            {...register("firstName",  { required: true, minLength: 2, maxLength: 25 })} 
            placeholder="Jason"
            className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1"
           />
           {errors.firstName && <p></p>}
           {errors.firstName && (
                <div className="invalid-feedback">Min 2 characters</div>
            )}
        </div>

        <div className="md:w-full px-3 mb-[1rem]">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" htmlFor="grid-first-name">
            Last Name
          </label>
          <input 
            {...register("lastName",  { required: true, minLength: 2, maxLength: 25 })} 
            placeholder="Donavan"
            className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1"
           />
           {errors.lastName && <p></p>}
           {errors.lastName && (
                <div className="invalid-feedback">Min 2 characters</div>
            )}
        </div>
        
        <div className="md:w-full px-3 mb-[1rem]">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" htmlFor="grid-first-name">
           Email
          </label>
          <input 
            {...register("email",  { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="test@gmail.com"
            className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1"
           />
           {errors.email && <p></p>}
           {errors.email && (
                <div className="invalid-feedback">Required and in correct format</div>
            )}
        </div>

        <div className="md:w-full px-3 mb-[1rem]">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1" htmlFor="grid-password">Password</label>
          <input 
          className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-1" 
          {...register("password", { required: true, minLength: 6, maxLength: 50, pattern: /\d/ })} 
          placeholder="Password"  
          type={passwordShown ? "text" : "password"}
          />
          
          {errors.password && (<div className="invalid-feedback">At least 6 characters and contain 1 number</div>)}
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
          {/* <Controller
            control={control}
            name="images"
            render={({ field: {onChange, ref } }) => (
              <input
                type="file"
                multiple
                // onChange={handleFileSelected}
                onChange={(e) => {
                  onChange(e.target.files); // update FileList
                }}
                ref={ref}
                className={classNames({
                  // Modify the Button shape, spacing, and colors using the `file`: directive
                  // button colors
                  "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
                  "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
                  "file:px-4 file:py-2 file:mr-4 file:border-none": true,
                  // overall input styling
                  "hover:cursor-pointer border rounded-lg text-gray-400": true,
                })
                }
              />
            )}
          /> */}
              {/* <input
                type="file"
                multiple
                onChange={handleFileSelected}
                className={classNames({
                  // Modify the Button shape, spacing, and colors using the `file`: directive
                  // button colors
                  "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
                  "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
                  "file:px-4 file:py-2 file:mr-4 file:border-none": true,
                  // overall input styling
                  "hover:cursor-pointer border rounded-lg text-gray-400": true,
                })
                }
              /> */}
            <Controller
              name="photos"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, ref } }) => (
                <div className="md:w-full px-3 mb-[.5rem]">
                <input 
                  className={classNames({
                    // Modify the Button shape, spacing, and colors using the `file`: directive
                    // button colors
                    "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
                    "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
                    "file:px- file:py-2 file:mr-4 file:border-none": true,
                    // overall input styling
                    "hover:cursor-pointer border rounded-lg text-gray-400": true,
                    "md:w-full mb-[1rem]": true,
                  })}
                  type="file" 
                  multiple
                  onChange={e => {
                    onChange(e.target.files);
                    handleFileSelected(e);
                  }}
                  ref={ref}
                />
                {errorMessage && (<div className="invalid-feedback">{errorMessage}</div>)}
                </div>
              )}
            />
          <PreviewImages images={images} />
          <div className="flex flex-row justify-center items-center mb-6 w-full ">
            {/* <button type="submit" className="w-[150px] text-center justify-center text-gray-800 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-[#F7BE38]/50 mb-2">
              Register
            </button> */}
            <button type="submit" className="flex text-center justify-center items-center relative inline-flex px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-yellow-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-yellow-400"></span>
              <span className="relative text-black group-hover:text-black">Register</span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
