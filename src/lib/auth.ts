// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import NextAuth from "next-auth";

// // Export the config (for use in [...nextauth]/route.ts)
// export { authOptions };

// // Server-side helper to get session
// export const auth = () => {
//   return NextAuth(authOptions);
// };

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export { authOptions };

// Server-side helper to get session properly
export const auth = () => getServerSession(authOptions);
