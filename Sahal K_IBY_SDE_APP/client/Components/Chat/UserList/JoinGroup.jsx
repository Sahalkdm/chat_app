import axios from "axios";
import UserListCard from "./UserListCard";

export default function Joingroup({Groups, own, handleGroupJoin}){
    async function handleClick(id, name) {
        try {
            const response = await axios.post('http://localhost:8080/api/chat/joinGroup', {
              userId:own,
              groupId:id
            });
            handleGroupJoin(response.data.group)
          } catch (error) {
            console.error('Error joining group:', error);
            alert(error.response?.data?.message || 'An error occurred while joining the group');
          }
    }
    return (
        <div>
            Join Group
            {Groups.length>0 && Groups.map(group=>(
                <UserListCard key={group._id} user={group} handleClickNewChat={handleClick}/>
            ))}
        </div>
    )
}