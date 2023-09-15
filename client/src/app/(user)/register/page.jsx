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
      <div className="white-onboarding-container col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
        <div className="form-wrapper !min-w-[100%] mx-auto my-auto justify-center items-center flex flex-col">
          <div className="flex flex-row w-full items-center mx-auto p-5  gap-[4rem] justify-between ">
            <div className="flex flex-col items-center">
              <div className="logo p-1">
                <Link href="/">
                  <Image  width="87" height="40" src="/images/logo/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
            <div className=" flex flex-colmt-30 items-center flex-row flex p-1">
                <p className="header-info pt-30 pb-50">
                  Already have an account? 
                  <Link href="/login">Login</Link>
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