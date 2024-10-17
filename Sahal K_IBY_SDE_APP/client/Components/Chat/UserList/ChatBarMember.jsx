export default function ChatBarMemeber({name, handleClick, stat}){
    return(
        <div className={"border-l border-gray-100 text-center w-full p-2 hover:bg-gray-400 cursor-pointer font-medium "+(stat===name?'border-b-2 border-b-cyan-500':'')} onClick={()=>handleClick(name)}>
            {name}
        </div>
    )
}