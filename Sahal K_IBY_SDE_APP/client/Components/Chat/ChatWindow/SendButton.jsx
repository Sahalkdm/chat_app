import { IoSend } from "react-icons/io5";
function SendButton({handleClick}) {
  return (
    <button onClick={handleClick} className="w-10 bg-stone-700 rounded-[20px] h-fit p-2.5">
      <IoSend className="text-xl text-white text-center "/>
    </button>
  )
}

export default SendButton
