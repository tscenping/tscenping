import { Link } from "react-router-dom";
import Container from "../components/Util/Container";
import MatchBtn from "../components/Main/Game/MatchBtn";
import Ranking from "../components/Main/Ranking/Ranking";
import MainProfile from "../components/Main/Profile/Profile";
import { useModalState } from "../store/modal";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMyData } from "store/profile";
import LoginUserInfo from "../components/Login/LoginUserInfo/LoginUserInfo";
import Toast from "../components/Toast/Toast";
import Mfa from "components/Login/Mfa";

export default function Main() {
  const queryClient = useQueryClient();
  const { myData } = useMyData();
  const fetchData = async () => {
    try {
      const data = await queryClient.fetchQuery({ queryKey: ["rankingData"] });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <Container>
      <div className="relative flex flex-col justify-around w-full gap-4">
        <MainProfile />
        <MatchBtn />
        <Ranking />
      </div>
    </Container>
  );
}
