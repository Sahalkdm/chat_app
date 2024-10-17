import Layout from "@/Components/Layout";
import SignupBox from "@/Components/SignupBox";
import { useEffect } from "react";

export default function Signup(){
    useEffect(() => {
        // Access the environment variable
        const serverUrl = process.env.SERVER_URL;
        console.log('Server URL:', serverUrl);
    
      }, []);
    return (
        <Layout>
        <div className='h-screen flex justify-center items-center p-2'>
            <SignupBox/>
        </div>
        </Layout>
    )
}