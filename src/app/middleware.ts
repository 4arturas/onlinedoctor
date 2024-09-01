import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Middleware executed");

    const url = request.nextUrl.clone();

    // Check if the pathname is the root
    if (url.pathname === '/') {
        url.pathname = '/en'; // Redirect to the English version
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Apply middleware to all routes except static files and APIs
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};