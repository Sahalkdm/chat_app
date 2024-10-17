import UserListCard from "./UserListCard";

export default function UserListBox({allUsers, own, handleOpenChat, OnlineUsers, chattedUsers, handleChattedUser, notifications}){
    async function handleClick(id,name){        
        
            const userData = { rec_id:id, send_id:own.ownId, rec_name:name, send_name:own.ownname };
            try {
                const response = await fetch(`http://localhost:8080/api/chat/createChat`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(userData),
                });
          
                if (response.ok) {
                  const result = await response.json();
                  console.log("User added successfully:", result);
                  handleOpenChat(result._id, result.name)
                } else {
                  console.error("Failed to add user");
                }
              } catch (error) {
                console.error("Error:", error);
        }
        
    }

    const extractOtherName = (groupName, loggedUserName) => {
      const [name1, name2] = groupName.split('_');
      return name1 === loggedUserName ? name2 : name1;
    };

    const checkOnline = (members, loggedMember) => {
      const [id1, id2] = members;
      const otherId = id1 === loggedMember ? id2 : id1;
      return OnlineUsers[otherId]
    };

    return(
        <div>
          <div className="bg-gray-300 p-0.5 text-sm">Chatted Members</div>
          {chattedUsers.length>0 && chattedUsers.map(group=> {
  const otherName = extractOtherName(group?.name, own?.ownname);
  return (
    <UserListCard
      key={group._id}
      user={{ ...group, name: otherName }} // Update the user object with the new name
      handleClickNewChat={handleChattedUser}
      online={checkOnline(group.members, own.ownId)}
      showstatus={true}
      notifucation={notifications[group?._id]}
    />
  );
})} 
          <div className="bg-gray-300 p-0.5 text-sm">All Members</div>
            {allUsers.length>0 && allUsers.map(user=>(
                <UserListCard key={user._id} user={user} handleClickNewChat={handleClick} online={OnlineUsers && OnlineUsers[user?._id]} showstatus={true}/>
            ))}
            
        </div>
    )
}