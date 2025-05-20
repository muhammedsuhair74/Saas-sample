// "use client";
// import ChatBox from "@/components/ChatBox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, DollarSign, Users } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// // export const metadata = {
// //   title: "User Dashboard | SaaS Platform",
// //   description: "Manage your subscriptions and payments on the SaaS platform.",
// // };

// export default function Dashboard() {
//   const [status, setStatus] = useState("Not Subscribed");
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchStatus = async () => {
//       const response = await fetch("/api/stripe/status");
//       const data = await response.json();
//       setStatus(data.status || "Not Subscribed");
//     };

//     fetchStatus();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">
//         Welcome back, {session?.user?.name || "User"} 👋
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,245</div>
//             <p className="text-xs text-muted-foreground">+15 since last week</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//             <BarChart className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">548</div>
//             <p className="text-xs text-muted-foreground">+32 this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$12,500</div>
//             <p className="text-xs text-muted-foreground">
//               +5.4% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent className="text-sm text-muted-foreground">
//           <ul className="space-y-2">
//             <li>🔔 John Doe subscribed to the Pro plan</li>
//             <li>📬 Invite sent to sarah@example.com</li>
//             <li>💳 Payment of $99 received from Liam</li>
//           </ul>
//         </CardContent>
//       </Card>
//       <ChatBox />
//     </div>
//   );
// }

"use client";

import WorkoutChart from "@/components/Workout";
import { useState } from "react";

const Dashboard = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]); // Default to today's date

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Workout Dashboard</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      {/* Daily Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <WorkoutChart chartType="daily" date={date} />
        {/* Weekly Chart */}
        <WorkoutChart chartType="weekly" date={date} />
        {/* Monthly Chart */}
        <WorkoutChart chartType="monthly" date={date} />
      </div>
    </div>
  );
};

export default Dashboard;
