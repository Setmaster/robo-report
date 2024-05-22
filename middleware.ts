import {NextResponse} from "next/server";

export function middleware(request){
    console.log(request);
    return NextResponse.next();
}

// Used to filter the kind of requests that this middleware should be applied to
export const config = {
    matcher: '/news'
};