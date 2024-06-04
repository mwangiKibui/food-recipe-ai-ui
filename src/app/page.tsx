import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import {cookies} from 'next/headers';
import {permanentRedirect} from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:process.env.APP_NAME,
  description:process.env.APP_DESCRIPTION,
};

export default function Home() {
  let loggedInUser = cookies().get("loggedInUser");
  if(!loggedInUser?.value){
    // redirect to the login page
    permanentRedirect("/auth/signin");
  }else{
    loggedInUser = JSON.parse(loggedInUser.value);
    // parse the logged in user to the default layout
  }
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
