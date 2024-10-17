import Icon from "../ChatWindow/Icon";

export default function ChatListCard({user, own}){

    async function handleClickNewChat(){
        const userData = { rec_id:user._id, send_id:own.id, rec_name:user.username, send_name:own.username };
        /*try {
            const response = await fetch(`http://localhost:8080/api/chat/createChat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log("User added successfully:", result);
            } else {
              console.error("Failed to add user");
            }
          } catch (error) {
            console.error("Error:", error);
          }*/
    }

    return(
        <div key={user._id} onClick={handleClickNewChat} className='flex gap-1.5 p-2 items-center border-b border-gray-300'>
            <Icon icon={'S'}/>
            <div className='font-medium text-lg'>{user.name}</div>
            <div className='text-right'>Online</div>
        </div>
    )
}