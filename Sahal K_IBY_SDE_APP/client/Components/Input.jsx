export default function Input({type, placeholder, name, handleChange, required=false}){
    return(
        <div className='w-full p-2'>
            <label className='font-medium text-gray-700'>{name}</label><br/>
            <input className='w-full font-medium p-1 text-lg shadow-md shadow-gray-300 outline-2 outline-offset-1 outline-purple-400 bg-gray-100 focus:outline-purple-400 placeholder:text-gray-400 placeholder:text-opacity-40' required={true} type={type} placeholder={placeholder} onChange={handleChange}/>
        </div>
    )   
}