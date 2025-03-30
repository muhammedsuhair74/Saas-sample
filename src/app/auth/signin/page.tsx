"use server";
import { fetcher } from "../../../utils/fetcher";
import SignIn from "./components/signin";

const page = async () => {
  const response = await fetcher("/auth/signup", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", response);
  return <SignIn />;
};

export default page;
