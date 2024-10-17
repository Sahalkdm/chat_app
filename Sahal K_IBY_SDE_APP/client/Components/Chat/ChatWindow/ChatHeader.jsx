import Icon from "./Icon";

export default function ChatHeader({group}){
    return (
        <div className="bg-gray-300 p-2 flex gap-1 items-center">  
            <Icon icon={group.gpName.charAt(0)}/>          
            <div className="text-lg font-medium text-stone-800">{group.gpName}</div>
        </div>
    )
}