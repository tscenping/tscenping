import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Login from "./pages/Login";
import UserInfoPage from "./pages/UserInfo";
import LoginCallbackPage from "./pages/Callback";
import Rank from "./pages/Rank";
import FriendsPage from "./pages/Friends";
import InChattingPage from "./pages/InChatting";
import AllChattingPage from "./pages/AllChatting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Game from "./pages/Game";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login/userinfo" element={<UserInfoPage />} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/error" element={<Error />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/friends" element={<FriendsPage />}></Route>
          <Route path="/inchatting" element={<InChattingPage />}></Route>
          <Route path="/chatting" element={<AllChattingPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
