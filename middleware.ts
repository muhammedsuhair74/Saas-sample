import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Create a middleware function that combines authentication with custom logic
export default withAuth(
  function middleware() {
    // You can add custom middleware logic here

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Check if token exists
        if (!token) {
          return false;
        }

        // Token exists, allow access
        return true;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
