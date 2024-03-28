import useDorpDownIcon from "../../../hooks/useDropDownIcon";

export default function Game() {
  const gameIcon = useDorpDownIcon({ types: "GAME" });
  return <> 
    {gameIcon} 게임초대
    </>;
}
