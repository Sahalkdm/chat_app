import Layout from "@/Components/Layout";
import LoginBox from "@/Components/LoginBox";

export default function Login(){
    return (
        <Layout>
        <div className='h-screen flex justify-center items-center'>
            <LoginBox/>
        </div>
        </Layout>
    )
}