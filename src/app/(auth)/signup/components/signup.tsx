"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetcher } from "../../../../utils/fetcher";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("signup page", name, email, password);
    const res = await fetcher("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    console.log("signup page res", res);
    if (res.name) {
      router.push("/signin");
    } else {
      const { message } = await res;
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 shadow-lg rounded-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded "
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded "
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded "
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <a href="/signin" className="text-blue-500 underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
