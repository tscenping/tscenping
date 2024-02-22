interface GameTypeSelectorProps {
  gameType: "NORMAL" | "LADDER";
  setGameType: (gameType: "NORMAL" | "LADDER") => void;
}

export default function GameTypeSelector(props: GameTypeSelectorProps) {
  const selectedLabel = "text-black flex-1 z-10 text-center";
  const unselectedLabel = "text-white flex-1 text-center cursor-pointer w-full h-full flex justify-center items-center hover:scale-110 transition-transform duration-150";
  const selectedRadio = `absolute w-1/2 h-full bg-white rounded-lg transition-transform duration-300 ease-in-out scale-110 ${
    props.gameType === "LADDER" ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <>
      <div className="flex flex-1 justify-center items-center w-2/5 px-5 ">
        <input
          type="radio"
          value="LADDER"
          name="gameType"
          id="LADDER"
          checked={props.gameType === "LADDER"}
          className="hidden"
          onChange={() => props.setGameType("LADDER")}
        />
        <input
          type="radio"
          value="NORMAL"
          name="gameType"
          id="NORMAL"
          className="hidden"
          checked={props.gameType === "NORMAL"}
          onChange={() => props.setGameType("NORMAL")}
        />
        <div className="relative flex flex-1 bg-buttonBg h-3/5 rounded-lg flex-basis max-w-sm min-w-[200px] items-center ">
          <div className={selectedRadio}></div>
          <label
            htmlFor="LADDER"
            className={
              props.gameType === "LADDER" ? selectedLabel : unselectedLabel
            }
          >
            Ladder
          </label>
          <label
            htmlFor="NORMAL"
            className={
              props.gameType === "NORMAL" ? selectedLabel : unselectedLabel
            }
          >
            Normal
          </label>
        </div>
      </div>
    </>
  );
}
