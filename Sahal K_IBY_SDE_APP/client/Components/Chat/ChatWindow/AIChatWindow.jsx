import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import SendButton from "./SendButton";
import axios from "axios";

export default function AIChatWindow(own){
    const [group, setGroup]=useState({gpName:'Chat AI'})
    const [message, setMessage]=useState('')
    function handleChange(ev){
        console.log(ev);
        setMessage(ev)
    }
    async function sendMessgae(){
        const data={message,id:own}
        try{
        const response = await axios.post('http://localhost:8080/api/chat/aichat', data);
        console.log('Message sent:', response.data);
            setMessage('')
          } catch (error) {
            console.error('Error sending message:', error);
          }
    }
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
            <ChatHeader group={group}/>
            <div>
                coming soon
            </div>
            <div>
            </div>
            </div>

            {/*<div className="flex justify-between gap-1 m-1 items-center p-1">
            <ChatInput handleInput={handleChange} val={message}/>
            <SendButton handleClick={sendMessgae}/>
        </div>*/}
            
        </div>
    )
}