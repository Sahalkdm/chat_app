import Button from "@/Components/button";
import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useEffect } from "react";

export default function Home(){

  return (
    <Layout>
      <div className="text-5xl text-center pt-5 font-bold text-white">Chat With Friends</div>
      <div className="text-center flex justify-center items-center mt-10">
        <div className="w-80 h-80 shadow-lg shadow-gray-800 flex flex-col items-center justify-center gap-5">
          <div className="text-2xl font-bold text-white">Join Chat!</div>
        <Link href={'/chat'} className="text-center font-bold border text-2xl w-60 shadow-md shadow-gray-700 rounded-md bg-purple-900 text-white p-2 hover:bg-purple-800">Join Chat</Link>
        </div>
      </div>
    </Layout>
  )
}