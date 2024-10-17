import { useState } from "react";
import Input from "./Input";
import Button from "./button";
import UserBox from "./UserBox";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
export default function LoginBox(){
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    
    const router = useRouter()
    async function handleLogin(e){
        e.preventDefault();
        const userData = {username, password };
        try {
            const response = await fetch(`http://localhost:8080/api/user/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
            });
                
            if (response.ok) {
              
              const result = await response.json();
              await axios.get('/api/hello?id='+result.token);
              router.push('/chat')

            }else if(response.status===401){
              alert('Invalid credentials!')
            } else {
              console.error("Failed to add user");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }
    return (
        <UserBox>
            <h1 className='text-2xl font-bold text-purple-800'>Login</h1>
            <Input type={'text'} placeholder={'Username'} name={'Username'} handleChange={(ev)=>setUsername(ev.target.value)}/>
            <Input type={'password'} placeholder={'password'} name={'Password'} handleChange={(ev)=>setPassword(ev.target.value)}/>
            <div className="text-right w-full">
             Don't have account <Link className="text-blue-500" href={'/register'}>Register</Link>
            </div>
            <Button name={'Login'} onclickfn={handleLogin}/>
        </UserBox>
    )
}