import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  
  // If user is already signed in, redirect to home
  if (userId) {
    redirect("/home");
  }

  return <SignUp />;
}
