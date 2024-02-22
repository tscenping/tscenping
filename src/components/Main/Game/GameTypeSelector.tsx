interface GameTypeSelectorProps {
  gameType: string;
  setGameType: (gameType: "NORMAL" | "LADDER") => void;
}

export default function GameTypeSelector(props: GameTypeSelectorProps) {
  const selectedLabel = "text-black flex-1 z-10 text-center";
  const unselectedLabel = "text-white flex-1 text-center";
  const selectedRadio = `absolute w-1/2 h-full bg-white rounded-lg transition-transform duration-500 ease-in-out ${
    props.gameType === "LADDER" ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <>
      <div className="flex justify-center w-full px-5 ">
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
        <div className="relative flex bg-black rounded-lg flex-basis w-96">
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
