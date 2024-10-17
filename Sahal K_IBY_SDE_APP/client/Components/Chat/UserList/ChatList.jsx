import { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import CreateChatBox from "./CreateChatBox";
import UserListBox from "./UserListBox";
import CreateGroup from "./CreateGroup";
import ChatBarMemeber from "./ChatBarMember";
import GroupListBox from "./GroupListBox";
import ChatAiBox from "./ChatAiBox";
import Joingroup from "./JoinGroup";

export default function ChatList({allUsers, chattedGroups, allGroups, own, handleOpenChat, OnlineUsers, chattedUsers, notifications, handleAIChat}){
    const [op, setOp]=useState('Chat')
    const [type, setType]=useState('Private')
    const [userJoinGroups, setUserJoinGroups]=useState([])
    const [userGroups, setUserGroups]=useState(chattedGroups)
    useEffect(() => {
          const nonMemberGroups = allGroups.filter(group => !group.members.includes(own.ownId));
          setUserJoinGroups(nonMemberGroups);
          }, [own]);

    function ManageOperation(name){
        setOp(name)
    }

    function handlChatType(name){
        setType(name)
    }

    function gotoGroup(gpData){
        setUserGroups([...userGroups, gpData])
        setType('Group')
        setOp('Chat')
    }
    return (
        <div className="flex flex-col justify-between h-full min-h-60">
            <div>
            <ChatBar handleOperation={ManageOperation} stat={op}/>
            {op==='Chat' && (<>
            <div className="flex jusify-between bg-green-700 text-white">
                <ChatBarMemeber name={'Private'} handleClick={handlChatType} stat={type}/>
                <ChatBarMemeber name={'Group'} handleClick={handlChatType} stat={type}/>
            </div>
            {type==='Private' && (<UserListBox allUsers={allUsers} own={own} handleOpenChat={handleOpenChat} OnlineUsers={OnlineUsers} chattedUsers={chattedUsers} handleChattedUser={handleOpenChat} notifications={notifications}/>)}
            {type==='Group' && (<GroupListBox Groups={userGroups} handleOpenChat={handleOpenChat} notifications={notifications}/>)}
            </>)}
            {op==='Create Group' && (<CreateGroup users={allUsers} owner={own} gotoGroup={gotoGroup}/>)}
            {op==='Join Group' && (<Joingroup Groups={userJoinGroups} own={own.ownId} handleGroupJoin={gotoGroup}/>)}
            </div>
            <ChatAiBox handleAIChat={handleAIChat}/>
        </div>
    )
}