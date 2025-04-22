"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ToastContainer />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white  shadow-md dark:shadow-lg dark:shadow-black/40 shadow-gray-200">
          {children}
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
