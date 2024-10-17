import ChatBarMemeber from "./ChatBarMember";

export default function ChatBar({handleOperation, stat}){
    return (
        <div className="flex justify-between bg-gray-300">
            <ChatBarMemeber name={'Chat'} handleClick={handleOperation} stat={stat}/>
            <ChatBarMemeber name={'Join Group'} handleClick={handleOperation} stat={stat}/>
            <ChatBarMemeber name={'Create Group'} handleClick={handleOperation} stat={stat}/>
        </div>
    )
}