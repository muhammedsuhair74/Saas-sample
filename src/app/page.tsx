import SignIn from "./(auth)/signin/components/signin";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <SignIn />
    </main>
  );
}
