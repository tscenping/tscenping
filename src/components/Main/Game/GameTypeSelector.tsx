export enum GameType {
  NORMAL = "NORMAL",
  LADDER = "LADDER",
}

interface GameTypeSelectorProps {
  gameType: GameType;
  setGameType: (gameType: GameType) => void;
}

export default function GameTypeSelector(props: GameTypeSelectorProps) {
  const selectedLabel =
    "text-[#2d2d2d] flex-1 z-10 text-center font-[League-Spartan] text-[18px] leading-7";
  const unselectedLabel =
    "text-white flex-1 text-center cursor-pointer w-full h-full flex justify-center items-center hover:scale-110 transition-transform duration-150 font-[League-Spartan] text-[18px] leading-7";
  const selectedRadio = `absolute w-1/2 h-full bg-white rounded-2xl transition-transform duration-300 ease-in-out scale-110 ${
    props.gameType === GameType.LADDER ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <div className="flex items-center justify-center w-3/5 h-1/3 ">
      <input
        type="radio"
        value="LADDER"
        name="gameType"
        id="LADDER"
        checked={props.gameType === GameType.LADDER}
        className="hidden"
        onChange={() => props.setGameType(GameType.LADDER)}
      />
      <input
        type="radio"
        value="NORMAL"
        name="gameType"
        id="NORMAL"
        className="hidden"
        checked={props.gameType === GameType.NORMAL}
        onChange={() => props.setGameType(GameType.NORMAL)}
      />
      <div className="relative flex flex-1 bg-[#424242]  rounded-2xl h-3/5 flex-basis items-center ">
        <div className={selectedRadio}></div>
        <label
          htmlFor="LADDER"
          className={
            props.gameType === GameType.LADDER ? selectedLabel : unselectedLabel
          }
        >
          Ladder
        </label>
        <label
          htmlFor="NORMAL"
          className={
            props.gameType === GameType.NORMAL ? selectedLabel : unselectedLabel
          }
        >
          Normal
        </label>
      </div>
    </div>
  );
}
