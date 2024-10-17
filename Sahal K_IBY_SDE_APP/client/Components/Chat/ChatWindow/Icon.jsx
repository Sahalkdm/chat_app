export default function Icon({icon, size='33px'}){
    return (
        <div className={'icon text-lg bg-green-700 rounded-full text-white font-medium flex justify-center items-center '} style={{width:size, height:size}}>
            {icon?icon:'A'}
        </div>
    )
}