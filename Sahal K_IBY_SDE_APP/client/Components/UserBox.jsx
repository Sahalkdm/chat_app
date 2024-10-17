export default function UserBox({children}){
    return (
        <form className='w-[95%] sm:w-96 shadow-md flex flex-col items-center px-2 py-4 my-auto outline-2 outline outline-offset-2 outline-purple-200  bg-white'>
            {children}
        </form>
    )
}