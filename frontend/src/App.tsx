import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/Notification";
import Chat from "./pages/Chat";
import CallPage from "./pages/CallPage";
import NotFound from "./pages/NotFound";
import Loader from "./components/loader/Loader";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <Loader />;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            authUser && isOnboarded ? (
              <Home />
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            authUser ? (
              !isOnboarded ? (
                <OnBoarding />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={authUser ? <Notification /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
