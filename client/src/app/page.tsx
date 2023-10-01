'use client'
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
export default function Home() {
  const user = useAppSelector((state) => state.loginUser);
  const router = useRouter();
  if (user) {
    router.push('/profile');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>

    )
}
