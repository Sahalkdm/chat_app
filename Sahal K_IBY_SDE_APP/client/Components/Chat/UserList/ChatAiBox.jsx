export default function ChatAiBox({handleAIChat}){
    return(
        <div onClick={handleAIChat} className="bg-gray-300 p-2 flex items-center gap-1">
                <div className="bg-white rounded-full p-0.5"><img className="w-7 h-7" src="ai_image.png" alt="ai" /></div>
                <div className="font-medium">Chat with AI</div>
        </div>
    )
}