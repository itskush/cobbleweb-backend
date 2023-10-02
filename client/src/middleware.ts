import { NextRequest, NextResponse } from "next/server"
import { useAppSelector } from "./redux/hooks";
export async function middleware(req: NextRequest) {
    // const user = useAppSelector((state) => state.user);
    // console.log(user);
    NextResponse.next()
}