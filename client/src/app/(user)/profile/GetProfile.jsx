'use client'
import { useRouter } from 'next/navigation';
import { store, useAppSelector } from "../../../redux/store";
import { useEffect, useState, useCallback } from "react";
import { getUserProfile } from '../../../lib/api';
import { Carousel } from 'react-responsive-carousel';
import ImageCarousel from '../../../components/ImageCarousel';
import axios from "axios";

const GetProfile = () => {
    const apiClient = axios.create({
        baseURL: 'http://localhost:3000',
      });
      
    const router = useRouter();
    const token = store.getState().auth.token;
    if (!token)
    {
      router.push('/login');
    }
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiClient.get('/api/users/me').then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="flex justify-center w-1/2 mx-auto my-[5rem]">
            <Carousel >
              {user.photos && user.photos.map((photo) => (
                  <ImageCarousel url={photo.url} name={photo.name} />
              ))}
            </Carousel>

        </div>
    );
  };
  
  export default GetProfile;
  