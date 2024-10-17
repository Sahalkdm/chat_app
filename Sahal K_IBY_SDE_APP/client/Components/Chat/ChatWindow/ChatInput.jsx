import AutoResizeTextarea from "./TextArea";

export default function ChatInput({handleInput, val}){

    return(
       <div className="align-bottom w-full h-fit py-1.5 px-3 focus:outline-gray-200 bg-white rounded-[20px]">
         <AutoResizeTextarea maxRows={4} handleText={handleInput} val={val}/>
       </div>
    )
}