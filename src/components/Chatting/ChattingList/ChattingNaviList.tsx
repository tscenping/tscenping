import { ChatTabStateType } from "types/ChatTypes";

interface ChattingNaviListProps {
  tabState: string;
  setTabState: (v: ChatTabStateType) => void;
  tabName: string;
  tabTitle: ChatTabStateType;
}

const ChattingNaviList = (props: ChattingNaviListProps): JSX.Element => {
  return (
    <li
      className={`py-2 w-1/2 text-center cursor-pointer ${
        props.tabState === props.tabTitle ? "border-b border-customGreen" : ""
      }`}
      onClick={() => {
        props.setTabState(props.tabTitle);
      }}
    >
      {props.tabName}
    </li>
  );
};

export default ChattingNaviList;
