"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../../utils/actions";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("signup page", name, email, password);
    const res = await signup(name, email, password);
    console.log("signup page res", res);
    if (res.ok) {
      router.push("/auth/signin");
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
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
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black"
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
          <a href="/auth/signin" className="text-blue-500 underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
