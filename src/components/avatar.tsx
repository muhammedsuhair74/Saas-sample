"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();
  const avatarUrl = session?.user?.image || "/default-avatar.png";

  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border">
      <Image
        src={avatarUrl}
        alt="User avatar"
        width={40}
        height={40}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
