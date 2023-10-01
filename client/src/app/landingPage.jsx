'use client'
import { useRouter } from 'next/navigation';
import { store } from "../redux";

export const LandingPage = () => {
  const router = useRouter();
  const token = store.getState().user.access_token;
  if (token) router.push('/profile');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
