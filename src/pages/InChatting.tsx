import { useState } from "react";
import Container from "../components/Util/Container";
import createChatting from "../img/InChatting/createChatting.svg";

const InChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("GROUP");

  const inChattingListStyle = "bg-[#424242] p-5 rounded-[20px] my-[24px]";
  return (
    <Container>
      <section>
        <section className="flex w-full justify-between p-7 items-center">
          <span className="text-[16px] font-bold md:text-[24px]">
            전체 채팅방
          </span>
          <img
            src={createChatting}
            alt="create chatting room"
            className="w-[40px]"
          />
        </section>
        <nav>
          <ul className="flex justify-around px-10 text-[16px] font-bold md:text-[20px]">
            <li
              className={`py-2 w-1/2 text-center cursor-pointer ${
                tabState === "GROUP" ? "border-b border-customGreen" : ""
              }`}
              onClick={() => {
                setTabState("GROUP");
              }}
            >
              참여중인 그룹 채팅
            </li>
            <li
              className={`py-2 w-1/2 text-center cursor-pointer ${
                tabState === "ONETOONE" ? "border-b border-customGreen" : ""
              }`}
              onClick={() => {
                setTabState("ONETOONE");
              }}
            >
              참여중인 1:1 채팅
            </li>
          </ul>
        </nav>
      </section>
      <section className="px-3 py-3">
        <ul>
          {tabState === "GROUP" && (
            <>
              <li className={inChattingListStyle}>
                <span>지우, Wonlim, Kota</span>
                <span className="ml-[8px] text-[#939393]">3</span>
              </li>
              <li className={inChattingListStyle}>
                <span>지우, Wonlim, Kota</span>
                <span className="ml-[8px] text-[#939393]">3</span>
              </li>
              <li className={inChattingListStyle}>
                <span>지우, Wonlim, Kota</span>
                <span className="ml-[8px] text-[#939393]">3</span>
              </li>
              <li className={inChattingListStyle}>
                <span>지우, Wonlim, Kota</span>
                <span className="ml-[8px] text-[#939393]">3</span>
              </li>
              <li className={inChattingListStyle}>
                <span>지우, Wonlim, Kota</span>
                <span className="ml-[8px] text-[#939393]">3</span>
              </li>
            </>
          )}
          {tabState === "ONETOONE" && (
            <>
              <li className={inChattingListStyle}>
                <span>지우</span>
              </li>
            </>
          )}
        </ul>
      </section>
    </Container>
  );
};

export default InChattingPage;
