import LoginForm from "../../../components/form/LoginForm";
import Link from "next/link";
import Image from "next/image";
const Login = () => {
  return (
    <div className="white-onboarding-container flex justify-center align-center md:mx-auto">
      <div className="form-wrapper !min-w-[100%] mx-auto my-auto justify-center items-center flex flex-col">
        <div className="flex flex-col items-center">
              <div className="logo p-1">
                <Link href="/">
                  <Image  width="87" height="40" src="/images/logo/logo.png" alt="logo" />
                </Link>
              </div>
          </div>
          <div className="flex flex-row w-full items-center mx-auto p-5  gap-[4rem] justify-center ">
            <div className=" flex flex-colmt-30 items-center flex-row flex p-1">
                <p className="header-info pt-30 pb-50">
                  Don't have an account? 
                  <Link className="ml-2 font-bold underline" href="/register"> Register</Link>
                </p>
            </div>
          </div>
          <LoginForm />
        </div>
    </div>
  );

}

export default Login;