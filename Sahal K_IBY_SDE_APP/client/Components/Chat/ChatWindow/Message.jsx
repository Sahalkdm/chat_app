import Icon from "./Icon";

export default function MessageBox({own=true, message}){
    return(
        <div className={"flex p-1 gap-1 "+(own&&'flex-row-reverse')}>
            <Icon size="25px" icon={message?.senderId?.name?.charAt(0).toUpperCase()}/>
        <div className={"w-fit rounded p-1 max-w-[70%] md:max-w-[60%] leading-5 word-break min-w-20 min-h-8 "+(own?'bg-emerald-200':'bg-white')}>
            {!own && (<div className="text-xs font-medium text-green-600">{message.senderId.name}</div>)}
            {message.message}  
        </div>
        </div>
    )
}