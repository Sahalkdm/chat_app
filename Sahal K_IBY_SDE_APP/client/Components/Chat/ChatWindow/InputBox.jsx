import { useState } from "react";
import ChatInput from "./ChatInput";
import SendButton from "./SendButton";
import axios from "axios";

export default function ChatInputBox({senderId, groupId, sendRealTime}){
    const [message, setMessage]=useState('')
    const [stat, setStat]=useState(false)
    function handleChange(ev){
        setMessage(ev)    
    }
    async function sendMessgae(){
        setStat(true)
        const messageData={message, groupId, senderId}
        
        try {
            const response = await axios.post('http://localhost:8080/api/chat/send', messageData);
            sendRealTime(response.data)
            setMessage('')
            setStat(false)
          } catch (error) {
            console.error('Error sending message:', error);
          }
    }
    return(
        <div className="flex justify-between gap-1 m-1 items-center p-1">
            <ChatInput handleInput={handleChange} val={message}/>
            <SendButton handleClick={sendMessgae}/>
        </div>
    )
}