import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/Notification";
import Chat from "./pages/Chat";
import CallPage from "./pages/CallPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/call" element={<CallPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
