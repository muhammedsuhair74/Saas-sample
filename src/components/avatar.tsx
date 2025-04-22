"use client";

import Image from "next/image";
import DefaultAvatar from "../../public/avatarDefault.png";

const UserAvatar = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border">
      <Image
        src={avatarUrl || DefaultAvatar}
        alt="User avatar"
        width={40}
        height={40}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default UserAvatar;
