import AvatarUploader from "@/components/AvatarUploader";
import AutToggle from "@/components/dashboard/2FAAuthToggle/AutToggle";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const user = session?.user?.id;
  console.log("session?.user?.image", session?.user?.image);
  const userDetails = await getUser(user);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-md space-y-6 flex flex-col gap-4 justify-center items-center border dark:bg-slate-800">
      <h1 className="text-2xl font-semibold">Profile Settings</h1>

      <AutToggle isEnabled={userDetails?.isTwoFactorEnabled || false} />

      <div className="space-y-2">
        <p className="text-sm  text-center">Update your avatar</p>
        <AvatarUploader
          userId={user}
          previousImage={userDetails?.avatarUrl || undefined}
        />
      </div>
    </div>
  );
}
