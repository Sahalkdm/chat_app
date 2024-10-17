import ChatListCard from "./ChatListCard";

export default function UserChatListBox({chattedGroups}){
    return(
        <div>
            {chattedGroups.length>0 && chattedGroups.map(user=>(
                <ChatListCard key={user._id} user={user} />
            ))}
        </div>
    )
}