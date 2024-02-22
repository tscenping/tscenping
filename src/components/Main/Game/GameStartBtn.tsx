
interface GameTypeSelectorProps {
    gameType: "NORMAL" | "LADDER";
}
export default function GameStartBtn(props:GameTypeSelectorProps){
    return (
        // <div className={`flex gap-2 h-2/5 w-2/5 justify-around ${props.gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`} >
            <>
            <button className={`absolute rounded-md relative bg-customGreen w-1/2 text-black min-w-[100px] font-bold hover:scale-105 ${props.gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}> Matching </button>
            <button className={`absolute rounded-md relative bg-customGreen w-1/2 text-black min-w-[100px] font-bold hover:scale-105 ${props.gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}> Inviting </button>
            </>
        // </div>
    )
}