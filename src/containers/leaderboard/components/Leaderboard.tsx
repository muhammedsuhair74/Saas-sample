'use client'
import { LeaderboardProps } from "../../../../type";
import Avatar from "../../../components/avatar";



const Leaderboard = ({ data }: { data: LeaderboardProps }) => {
    console.log(data)
    return (
        <div>
            <li
                key={data.id}
                className="flex items-center justify-between bg-muted/50 px-4 py-3 rounded-md"
            >
                <div className="flex items-center gap-4">
                    {/* <span className="text-lg font-bold text-muted-foreground w-6 text-right">
                        {i + 1}
                    </span> */}
                    <Avatar avatarUrl={data.avatarUrl ?? ""} />
                    {/* <AvatarImage src={user.avatarUrl ?? ""} alt={user.name ?? user.email} />
                    <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar> */}
                    <div>
                        <p className="font-medium">{data.name}</p>
                        {/* <p className="text-sm text-muted-foreground">{data.email}</p> */}
                    </div>
                </div>
                <div className="font-semibold text-primary">
                    {data.reps || 0} reps
                </div>
            </li>
            {!data && (
                <li className="text-center text-muted-foreground">
                    No data available
                </li>
            )}
        </div>
    )
}

export default Leaderboard;