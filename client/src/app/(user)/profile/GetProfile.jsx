'use client'
import { useRouter } from 'next/navigation';
import { store } from "../../../redux/store";
import { useEffect, useState, useCallback } from "react";
import { getUserProfile } from '../../../lib/api';
import { Carousel } from 'react-responsive-carousel';
import ImageCarousel from '../../../components/ImageCarousel';
import axios from "axios";

const GetProfile = () => {
    const apiClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });
      
    const router = useRouter();
    const token = store.getState().auth.token;
    if (!token)
    {
      router.push('/login');
    }
    const [user, setUser] = useState([]);

    useEffect(() => {
      if(!token) return;
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      apiClient.get('/api/users/me').then((response) => {
          setUser(response.data);
      }).catch((error) => {
          console.log(error);
      });
    }, []);

    return (
        <div className="flex justify-center w-1/2 mx-auto">
            <Carousel >
              {user.photos && user.photos.map((photo) => (
                  <ImageCarousel url={photo.url} name={photo.name} />
              ))}
            </Carousel>
        </div>
    );
  };
  
  export default GetProfile;
  