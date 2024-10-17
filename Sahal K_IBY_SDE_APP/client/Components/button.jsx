export default function Button({type='button' ,name, disabled, onclickfn}){
    return (
        <button type={type} disabled={disabled} onClick={onclickfn} className="w-1/2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text font-medium px-6 py-2.5 text-center me-2 mb-2 mt-3">{name}</button>
    )
}