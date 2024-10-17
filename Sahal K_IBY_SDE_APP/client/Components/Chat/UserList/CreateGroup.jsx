import Button from "@/Components/button";
import Input from "@/Components/Input";
import { useState } from "react";
import UserListCard from "./UserListCard";
import axios from "axios";

export default function CreateGroup({users, owner, gotoGroup}){
    const [add, setAdd]=useState(false)
    const [members, setMembers]=useState([owner.ownId])
    const [memNames, setMemNames]=useState([])
    const [gpName, setGpName]=useState('')
    function handleGroupName(ev){
        setGpName(ev.target.value)
    }
    function addMember(id, name){
        if (id && !members.includes(id)) {
            setMembers([...members, id]);
            setMemNames([...memNames, {id,name}])
        }
    }
    async function CreateGroupfn(){
        const data = {gpName, members}
            
            try {
                const response = await axios.post('http://localhost:8080/api/chat/createGroup', data);
                //sendRealTime(response.data)
                //setMessage('')
                //setStat(false)
                gotoGroup(response.data)
              } catch (error) {
                console.error('Error sending message:', error);
              }
    }
    return(
        <div>
            Create Group
            <Input name={'Group Name'} type={'text'} placeholder={'Enter Group name...'} handleChange={handleGroupName}/>
            <div>
                <div>Members</div>
                <div className="flex flex-wrap p-1 gap-1 bg-gray-100 m-1">
                    {memNames.length>0 && memNames.map(mem=>(
                        <p>{mem.name},</p>
                    ))}
                </div>
            </div>
            <div>
                <button className="bg-green-600 text-white rounded-md py-1 px-2 m-1 hover:bg-green-700" onClick={CreateGroupfn}>Save</button>
            </div>
            {add ? (
                <div>
                    {users?.length>0 && users?.map(user=>(
                        <UserListCard key={user._id} user={user} handleClickNewChat={addMember}/>
                    ))}
                </div>): (<button className="border-2 border-purple-400 m-1 p-1 rounded-md shadow-md text-purple-900 hover:bg-purple-500 hover:text-white" onClick={()=>setAdd(true)}>Add Members</button>)}
        </div>
    )
}