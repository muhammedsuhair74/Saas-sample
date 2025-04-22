"use server";
import SignIn from "./components/signin";

const page = async () => {
  // const response = await fetcher("/signup", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // console.log("response", response);
  return <SignIn />;
};

export default page;
