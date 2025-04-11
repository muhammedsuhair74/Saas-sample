"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      // callbackUrl: "/dashboard",
    });
    console.log("result", result);

    if (result?.error && result?.status === 401) {
      toast.error("invalid email or password");
      setError("Invalid email or password");
    } else {
      toast.success("Signed in successfully");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 shadow-lg rounded-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-black">Sign In</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-black w-full p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-black">
          Don’t have an account?
          <a href="/auth/signup" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
