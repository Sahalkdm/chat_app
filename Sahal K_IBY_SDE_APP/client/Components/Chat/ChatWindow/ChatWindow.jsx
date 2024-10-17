import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import InputBox from "./InputBox";
import MessageBox from "./Message";

export default function ChatWindow({messages, own, group, sendRealTime}){

    const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
    
    return(
        <div className="flex-col flex justify-between h-full">
            <div className="h-[calc(100%-100px)]">
                <ChatHeader group={group}/>
            <div className="h-[calc(100%-12px)] overflow-y-auto">
            {messages.length>0 && messages.map((msg,index)=>(
                <MessageBox key={index} message={msg} own={own.ownId==msg.senderId._id}/>
            ))}
            <div ref={messagesEndRef} />
            </div>
            </div>
            {group?.id && (<div className="bg-gray-300">
                <InputBox senderId={own.ownId} groupId={group.id} sendRealTime={sendRealTime}/>
            </div>)}
        </div>
    )
}