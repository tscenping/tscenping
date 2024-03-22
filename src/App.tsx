import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Rank from "./pages/Rank";
import FriendsPage from "./pages/Friends";
import InChattingPage from "./pages/InChatting";
import ChattingPage from "./pages/Chatting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/error" element={<Error />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/friends" element={<FriendsPage />}></Route>
          <Route path="/inchatting" element={<InChattingPage />}></Route>
          <Route path="/chatting" element={<ChattingPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
