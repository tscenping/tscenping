import { GameType } from './GameTypeSelector';

interface GameTypeSelectorProps {
  gameType: 'NORMAL' | 'LADDER';
}
export default function GameStartBtn(props: GameTypeSelectorProps) {
  return (
    <div className="flex gap-2 w-full h-2/5 justify-center relative max-w-[520px]">
      <button
        className={`relative absolute rounded-md w-2/3 bg-customGreen  text-black min-w-[220px] font-bold hover:scale-105 ${props.gameType === GameType.LADDER ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-500 ease-in-out`}
      >
        Game Start
      </button>
      <button
        className={`absolute rounded-md relative bg-customGreen w-1/3 text-black min-w-[100px] font-bold hover:scale-105 ${props.gameType === GameType.NORMAL ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-300 ease-in-out`}
      >
        Matching
      </button>
      <button
        className={`absolute rounded-md relative bg-customGreen w-1/3 text-black min-w-[100px] font-bold hover:scale-105 ${props.gameType === GameType.NORMAL ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-300 ease-in-out`}
      >
        Inviting
      </button>
    </div>
  );
}
