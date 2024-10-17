import UserListCard from "./UserListCard";

export default function GroupListBox({Groups, own, handleOpenChat, notifications}){
    function handleClick(id,name){        
            handleOpenChat(id, name)
            /*const userData = { rec_id:id, send_id:own.ownId, rec_name:name, send_name:own.ownname };
            console.log(userData);
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
        }*/
        
    }
    return(
        <div>
            {Groups.length>0 && Groups.map(group=>(
                <UserListCard key={group._id} user={group} handleClickNewChat={handleClick} notifucation={notifications[group?._id]}/>
            ))}
            
        </div>
    )
}