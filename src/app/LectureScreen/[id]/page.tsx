import React from "react";
import Footer from "../../Footer/page";
import Navbar from "@/components/ui/Navbar";
import { auth } from "../../../../auth";
import LectureScreen from "./Lecture";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const {id} = await params;
  if(!session){
    redirect("/login");
  }
  return (
    <div>
      <Navbar session={session} />
      <LectureScreen courseId={id} />
      <Footer />
    </div>
  );
};

export default Page;
