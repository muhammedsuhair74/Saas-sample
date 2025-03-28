import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to SaaS Platform</h1>
      <div className="mt-4">
        <Link
          href="/auth/signin"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
