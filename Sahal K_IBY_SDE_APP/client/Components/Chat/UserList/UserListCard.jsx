import Icon from "../ChatWindow/Icon";

export default function UserListCard({user, handleClickNewChat, online, showstatus=false, notifucation}){

    /**/

    return(
        <div key={user._id} onClick={()=>handleClickNewChat(user._id, user.username?user.username:user.name)} className='flex gap-1.5 p-2 items-center border-b border-gray-300 justify-between'>
            <div className="flex gap-1 items-center"><Icon icon={user.name.charAt(0).toUpperCase()}/>
            <div className='font-medium text-lg'>{user.name}</div></div>
            <div className="relative">
            {showstatus && <div className='text-right'>{online?'Online':'Offline'}</div>}
            {notifucation && (<div className="absolute top-[-42%] right-[-12%] bg-red-600 rounded-full p-1 w-3 h-3"><span className="absolute top-[-23%] left-[40%] text-[67%] text-white">!</span></div>)}
            </div>
        </div>
    )
}