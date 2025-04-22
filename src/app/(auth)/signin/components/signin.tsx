"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState<boolean | null>(null);

  const router = useRouter();

  const checkFor2FA = async () => {
    try {
      const res = await fetch("/api/users/check-2fa", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log("data 2fa", data);
      if (data?.error) {
        toast.error(data.error);
      } else if (data?.isTwoFactorEnabled) {
        try {
          await send2faCode();
          setRequires2FA(data?.isTwoFactorEnabled);
        } catch (error) {
          console.error("Error sending 2FA code:", error);
        }
      } else {
        setRequires2FA(false);
      }
    } catch (error) {
      console.error("Error checking 2FA:", error);
    }
  };

  const handleLogin = async () => {
    console.log("in handle login");
    debugger;
    setIsLoading(true);
    if (requires2FA === null) {
      console.log("in 2fa");
      await checkFor2FA();
      setIsLoading(false);
      return;
    } else {
      console.log("in signin");
    }
    console.log("after 2fa");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      code: requires2FA ? code : undefined,
    });
    setIsLoading(false);
    if (res?.error === "Invalid or expired code") {
      toast.error("Invalid 2FA code");
    } else if (res?.ok) {
      toast.success("Logged in!");
      router.push("/dashboard");
    } else {
      toast.error("Login failed");
    }
  };

  const send2faCode = async () => {
    const res = await fetch("/api/2fa/request", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log("data 2fa response", data);
    if (res.ok) {
      toast.success("Verification code sent");
    } else {
      toast.error("Failed to send verification code");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left section */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">SaaS Platform</h1>
          <p className="text-lg">Manage your subscription effortlessly</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Sign in to your account
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {requires2FA !== null && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {requires2FA && (
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="2FA Code"
              />
            )}

            <Button onClick={handleLogin} className="w-full">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : requires2FA === null ? (
                "Enter password"
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
