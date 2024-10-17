import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./button";
import UserBox from "./UserBox";
import { useRouter } from "next/router";

export default function SignupBox(){
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [cnPass, setCnfPass]=useState('')
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, phone, username, password };
        try {
            const response = await fetch(`http://localhost:8080/api/user/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
            });
      
            if (response.ok) {
              const result = await response.json();
              router.push('/login')
            }else if(response.status===401){
              console.log(response);
              
              alert('username already exist! Please use another');
            } else {
              console.error("Failed to add user");
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              alert(error.response.data.message);
          } else {
              alert('An error occurred during registration');
          }
          }
        };
    
    return (
        <UserBox>
            <h1 className='text-2xl font-bold text-purple-800 [text-shadow:_0_2px_1px_rgb(200_90_241_/_0.4)]'>Register</h1>
            <Input type={'text'} placeholder={'name'} name={'Name'} handleChange={(ev)=>setName(ev.target.value)} required={true}/>
            <Input type={'email'} placeholder={'email'} name={'Email'} handleChange={(ev)=>setEmail(ev.target.value)} required={true}/>
            <Input type={'number'} placeholder={'phone'} name={'Phone No.'} handleChange={(ev)=>setPhone(ev.target.value)}/>
            <Input type={'text'} placeholder={'Username'} name={'Username'} handleChange={(ev)=>setUsername(ev.target.value)}/>
            <Input type={'password'} placeholder={'password'} name={'Password'} handleChange={(ev)=>setPassword(ev.target.value)}/>
            <Input type={'password'} placeholder={'confirm password'} name={'Confirm Password'} handleChange={(ev)=>setCnfPass(ev.target.value)}/>
            <Button type={'submit'} onclickfn={handleSubmit} disabled={password && password!=cnPass} name={'Register'}/>
        </UserBox>
    )
}