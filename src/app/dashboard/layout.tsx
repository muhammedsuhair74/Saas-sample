import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { getUser } from "@/utils/actions";
import { AuthOptions, getServerSession } from "next-auth";
import { StaticImageData } from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
// import PushUpBadge from "../../../public/badges/pushup.svg";
import { getBadges } from "@/containers/dashboard/badges/actions";
import { getHighestBadge } from "@/utils/utils";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    redirect("/signin");
  }
  const user = await getUser(session.user.id);

  const badges = await getBadges(session.user.id);

  const highestBadge = getHighestBadge(badges) && {
    image: getHighestBadge(badges)?.image as unknown as StaticImageData,
    name: getHighestBadge(badges)?.name || ''
  };
  // const highestBadge = { image: PushUpBadge, name: "Push-Up Daily Topper" };

  console.log("highestBadge", highestBadge);

  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <div className="flex flex-col flex-1">
        {!!highestBadge && highestBadge.name && <Topbar highestBadge={highestBadge} />}
        {/* <BadgeUpdateTrigger /> */}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
