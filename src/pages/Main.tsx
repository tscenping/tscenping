import { Link } from "react-router-dom";
import Container from "../components/Util/Container";
import MatchBtn from "../components/Main/Game/MatchBtn";
import Ranking from "../components/Main/Ranking/Ranking";
import MainProfile from "../components/Main/Profile/Profile";
import { useModalState } from "../store/modal";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Main() {
  const queryClient = useQueryClient();
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
