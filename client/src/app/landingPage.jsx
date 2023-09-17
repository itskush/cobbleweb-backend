'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { store } from "../redux/store";

export const LandingPage = () => {
  const router = useRouter();
  const token = store.getState().auth.token;
  if (token) router.push('/profile');
  return (
    <div className="container w-[100%] sm:px-4 my-5">
      <div className="text-center flex flex-col mx-auto justify-center align-center">
        <h1 className="title-1 mt-5 w-3/4 m-auto">
          Learn and get <span className="educated">educated</span> from the best
          platform
        </h1>
        <div className="flex flex-row justify-center">
          <img src="/images/assets/home-1.png" className="w-[50%]" alt="" />
        </div>
      </div>
    </div>
  )
}
