"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async (provider: string) => {
    await signIn(provider);
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-black"
          onClick={() => handleSignIn("github")}
        >
          Sign in with GitHub
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded text-black"
          onClick={() => handleSignIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
