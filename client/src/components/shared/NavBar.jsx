'use client'
import { useEffect, useState } from "react";
import  Link  from 'next/link'
import { useRouter, usePathname  } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { PURGE } from 'redux-persist';
import { store } from "../../redux/store";
import axios from "axios";
const NavBar = () => {
      
    const pathname = usePathname()
    if (pathname  === '/login' || pathname  === '/register') return null

    const router = useRouter()
    const dispatch = useDispatch()
    const token = store.getState().auth.token;
    const [user, setUser] = useState([]);

    const logoutUser = async () => {
      await dispatch({
        type: PURGE,
        result: () => null,
      });
      router.push('/login')
    }

    useEffect(() => {
      if(token) {
        const apiClient = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        });
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiClient.get('/api/users/me').then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        });

      }
    }, []);

    return (
        <div className="w-1/2 md:align-center mx-auto max-sm:overflow-x-auto max-sm:w-[100%] max-sm:overflow-y-hidden">
          <div className="w-full border-Neutral-50 navbar mx-auto min-h-[50px]">
          <div className="w-3/4 navbar-start flex align-start min-h-[50px]">
              <i className="">
                <img src="/images/logo/logo.png" alt="logo" className="max-w-[70px]" />
              </i>
                { token && (
                   <div className="flex w-full ml-4 grow shrink basis-0 h-14 justify-start items-center gap-2 flex">
                      <div className="px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <Link href="/profile">Profile</Link>
                        </div>
                      </div>
                      <div className="md:hidden px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <a onClick={logoutUser}>Logout</a>
                        </div>
                      </div>
                      {/* <div className=" px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <Link href="/settings">Settings</Link>
                        </div>
                      </div> */}
                  </div>
                )}
                { !token && (
                   <div className="flex w-full ml-4 grow shrink basis-0 h-14 justify-start items-center gap-2 flex">
                      <div className=" px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <Link href="/">Home</Link>
                        </div>
                      </div>
                      <div className=" px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <Link href="/register">Register</Link>
                        </div>
                      </div>
                      <div className="px-6 py-4 rounded-3xl justify-center items-center gap-2 flex hover:bg-yellow-500">
                        <div className="text-center text-neutral-900 text-lg font-medium capitalize leading-relaxed">
                        <Link href="/login">Login</Link>
                        </div>
                      </div>
                    </div>
                )}
          </div>
          {token && ( 
                <div className="w-1/4 navbar-end flex justify-end">
                <div className="dropdown dropdown-end">
                  <label tabIndex="0" className="btn btn-ghost btn-circle avatar min-h-[50px] min-w-[50px]">
                  <i className="">
                      <img
                        className="min-w-[70px] bg-yellow-100"
                        src={user.avatar}
                      />
                    </i>
                  </label>
                  <ul
                    tabIndex="0"
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52 z-[100] "
                  >
                    <li className='hover:bg-yellow-400'>
                      <a onClick={logoutUser}>Logout</a>
                    </li>
                  </ul>
                </div>
                </div>
          )}
          </div>
        </div>
    )
}

export default NavBar