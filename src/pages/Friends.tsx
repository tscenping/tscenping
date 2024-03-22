import { useState } from "react";
import Container from "../components/Util/Container";
import FriendUsers from "../components/Friends/FriendUsers";
import BlockUsers from "../components/Friends/BlockUsers";

const FriendsPage = (): JSX.Element => {
  const [pageSection, setPageSection] = useState("friend");

  return (
    <Container>
      {pageSection === "friend" ? (
        <FriendUsers setPageSection={setPageSection} />
      ) : (
        <BlockUsers setPageSection={setPageSection} />
      )}
    </Container>
  );
};

export default FriendsPage;
