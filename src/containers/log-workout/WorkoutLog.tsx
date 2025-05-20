"use client"
import WorkoutDropdown from "@/components/workoutDropDown";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

const WorkoutLog = ({ previousWorkout }: { previousWorkout: any }) => {
    const { data: session } = useSession();  // Get session data (user info)
    const [selectedWorkout, setSelectedWorkout] = useState("pushups");  // Default to "pushups"
    const [reps, setReps] = useState(0);  // Store the number of reps
    const [message, setMessage] = useState("");  // For success/error messages
    const [dateTime, setDateTime] = useState(new Date());
    // Handle form submission to log the workout
    // const handleSubmit = async () => {
    //   if (!session?.user?.id || reps <= 0) {
    //     setMessage("Please enter a valid number of reps.");
    //     return;
    //   }

    //   try {
    //     // Save the workout log to the database
    //     const workoutLog = await prisma.workout.create({
    //       data: {
    //         userId: session.user.id,  // Link the workout to the logged-in user
    //         workoutType: selectedWorkout,  // Save selected workout type
    //         reps: reps,  // Save the number of reps
    //         hour: new Date().getHours(),  // Log the current hour
    //       },
    //     });
    //     setMessage("Workout logged successfully!");
    //   } catch (error) {
    //     setMessage("Error logging workout.");
    //     console.error(error);
    //   }
    // };

    console.log(previousWorkout)

    const handleSubmit = async () => {
        if (!session?.user?.id || reps <= 0) {
            setMessage("Please enter valid inputs.");
            return;
        }

        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                body: JSON.stringify({
                    workoutType: selectedWorkout,
                    reps,
                    date: dateTime.toISOString(),
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) setMessage("Workout logged!");
            else setMessage(data.error || "Something went wrong.");
        } catch (error) {
            console.error(error);
            setMessage("Failed to log workout.");
        }
    };
    return <div className="p-6">
        <h2 className="text-xl font-bold">Log Your Workout</h2>
        <div className="flex gap-4">
            <div className="mt-4 flex items-center">
                <label htmlFor="workout-name" className="block text-sm font-medium pr-2">
                    Workout Name:
                </label>
                <WorkoutDropdown
                    selectedWorkout={selectedWorkout}
                    setSelectedWorkout={setSelectedWorkout}  // Set selected workout type
                />
            </div>
            <div className="mt-4 flex items-center">
                <label htmlFor="reps" className="block text-sm font-medium pr-2">
                    Reps:
                </label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    placeholder="Enter reps"
                    className="px-4 py-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Select Date & Time</label>
                <DatePicker
                    selected={dateTime}
                    onChange={(date: Date | null) => setDateTime(date || new Date())}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

        </div>
        <div className="mt-4">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-md">
                Log Workout
            </button>
        </div>
        {message && <p className="mt-4">{message}</p>}
    </div>
};

export default WorkoutLog;

