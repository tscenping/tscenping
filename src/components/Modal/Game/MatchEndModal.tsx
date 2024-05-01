import { useEffect } from "react";
import { useMatchEndState, useModalState } from "store/modal";
import ModalHeader from "../ModalHeader";

export default function MatchEndModal() {
  const { matchEndData, setMatchEndData } = useMatchEndState();
  const { setModalName } = useModalState();

  return (
    <>
      <ModalHeader title="MatchEnd" />
      {matchEndData !== null && <>{matchEndData.isWin}</>}
      <button
        onClick={() => {
          setModalName(null);
          setMatchEndData(null);
        }}
      >
        확인
      </button>
    </>
  );
}
