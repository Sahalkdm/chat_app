import ChatLayout from "@/Components/Chat/ChatPage";
import Layout from "@/Components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parse } from "cookie";
import ChatList from "@/Components/Chat/UserList/ChatList";
import ChatWindow from "@/Components/Chat/ChatWindow/ChatWindow";
import io from 'socket.io-client';
import AIChatWindow from "@/Components/Chat/ChatWindow/AIChatWindow";

let socket;

export default function ChatPage({userInfo, allUsers, allGroups, chattedGroups, chattedUsers}){

    //const [userInfo, setUserInfo] = useState(null);
    const router = useRouter()

    const [messages, setMessages] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [gpName, setGpName]=useState('');
    const [onlineUsers, setOnlineUsers] = useState({});
    const [notifications, setNotifications] = useState({}); // Store notifications for groups
    const [chatAi, setChatAi]=useState(false)

    useEffect(() => {
      socket = io('http://localhost:8080');

      socket.emit('userOnline', userInfo.id);

        // Listen for user online status updates
        socket.on('updateUserStatus', (updatedOnlineUsers) => {
            setOnlineUsers(updatedOnlineUsers);
        });

      // Listen for incoming messages
      socket.emit("joinGroup", { groupId:selectedGroupId });

    // Listen for incoming messages
    socket.on("receiveMessage", (newMessage) => {
      const newMsg={groupId:newMessage?.groupId, message:newMessage?.message, senderId:{_id:newMessage?.senderId, name:userInfo?.username}}
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });

    socket.on('newMessageNotification', ({ groupId, message }) => {
      setNotifications((prevNotifications) => ({
          ...prevNotifications,
          [groupId]: true // Set notification for this group
      }));
      handleOpenGroup(selectedGroupId)
  });

    return () => {
      socket.off("receiveMessage");
    };
    }, [selectedGroupId]);

    const handleOpenGroup = (groupId) => {
      setNotifications((prevNotifications) => ({
          ...prevNotifications,
          [groupId]: false // Clear notification for this group
      }));
  };

    function handleRealTime(msg){
      socket.emit("sendMessage", { groupId:selectedGroupId, senderId: msg.senderId, message: msg.message });
    }

  // Fetch messages when a group is selected
  const fetchMessages = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/group/${groupId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  function ManageAiChat(){
    setChatAi(true)
  }

  //opeining a chat
    async function OpenChat(id, gpname){
      handleOpenGroup(id)
      setSelectedGroupId(id)
      setGpName(gpname)
      fetchMessages(id)
    }

    return (
        <Layout>
            <div className="text-white text-lg font-medium px-2 flex justify-between"><p>Chat Page </p><p>{userInfo?.username}</p></div>
            <div className='flex flex-col sm:flex-row gap-1 p-1'>
            <div className='bg-gray-200 w-full  md:w-[22rem] w-[18rem] sm:m-2'>
                <ChatList handleAIChat={ManageAiChat} notifications={notifications} allGroups={allGroups} allUsers={allUsers} chattedGroups={chattedGroups} own={{ownId:userInfo.id,ownname:userInfo.username}} handleOpenChat={OpenChat} OnlineUsers={onlineUsers} chattedUsers={chattedUsers}/>
            </div>
            <div className='bg-gray-200 w-full h-[93vh] sm:w-[calc(100%-18rem)] md:w-[calc(100%-22rem)]  sm:m-2'>
                {chatAi ? (<AIChatWindow own={userInfo.id}/>) : (<ChatWindow messages={messages} own={{ownId:userInfo.id,ownname:userInfo.username}} group={{id:selectedGroupId, gpName:gpName}} sendRealTime={handleRealTime}/>)}
            </div>
        </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const cookies = parse(context.req?.headers.cookie || '');
    const token = JSON.parse(cookies.session || '{}');

    if (!token) {
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          };
    }
  
    const response = await fetch('http://localhost:8080/api/user/chat', {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
  
    if (response.status === 401) {
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          };
    }

    const userInfo = await response.json();

    const res = await fetch('http://localhost:8080/api/chat/userslist?id='+userInfo.id);
    const data = await res.json();
  
    return {
      props: {
        allUsers: data.allUsers || [],
        allGroups: data.allGroups || [],
        chattedUsers: data.chattedUsers || [],
        chattedGroups: data.chattedGroups || [],
        userInfo,
      },
    };
  }
  