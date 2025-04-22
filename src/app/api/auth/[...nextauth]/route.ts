import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../lib/prisma";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      plan?: string;
      avatarUrl?: string;
    };
  }
}

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text", optional: true },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          (!credentials?.password && !credentials?.code)
        ) {
          throw new Error("Missing email or password");
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null; // Return null if user is not found
        }

        if (user.isTwoFactorEnabled) {
          const validToken = await prisma.twoFactorToken.findFirst({
            where: {
              userId: user.id,
              token: credentials.password,
              // expiresAt: { gt: new Date() },
            },
          });
          if (!validToken) {
            return null; // Return null if token is invalid
          }
        } else {
          // Validate password using bcrypt
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            return null; // Return null if password is invalid
          }
        }

        // Return the user object for the session
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
    // maxAge: 60, // 30 days
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatarUrl = user.avatarUrl;
        token.plan = user.plan;

        // Set token expiration
        const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
        // const maxAge = 60; // 30 days in seconds
        token.expiresAt = Math.floor(Date.now() / 1000) + maxAge;
      }
      if (token.expiresAt && token.expiresAt < Date.now() / 1000) {
        return null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        plan: token.plan as string | undefined,
        avatarUrl: token.avatarUrl as string | undefined,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/signin")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
