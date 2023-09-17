import React from "react";

import SignUpForm from "../../../components/form/SignUpForm";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: 'Sign Up',
    description: ``,
}

const SignUp = () => {
  return (
      <div className="white-onboarding-container">
        <div className="form-wrapper !min-w-[100%] mx-auto my-auto justify-center items-center flex flex-col">
        <div className="flex flex-col items-center">
              <div className="logo p-1">
                <Link href="/">
                  <Image  width="87" height="40" src="/images/logo/logo.png" alt="logo" />
                </Link>
              </div>
          </div>
          <div className="flex flex-row w-full items-center mx-auto p-5  gap-[4rem] justify-center">
            <div className=" flex flex-col mt-30 items-center  flex-row flex p-1">
                <p className="header-info pt-30 pb-50">
                  Already have an account? 
                  <Link className="ml-2 font-bold underline" href="/login">Login</Link>
                </p>
            </div>
          </div>
          {/* End d-flex */}
         
          <SignUpForm />
        </div>
        {/* /.form-wrapper */}
      </div>
  );
};

export default SignUp;