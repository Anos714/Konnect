import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/Notification";
import CallPage from "./pages/CallPage";
import NotFound from "./pages/NotFound";
import Loader from "./components/loader/Loader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/layout/Layout";
import { useThemeStore } from "./store/useThemeStore";
import ChatPage from "./pages/ChatPage";
import Friends from "./pages/Friends";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const theme = useThemeStore((state) => state.theme);

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <Loader />;

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <Home />
              </Layout>
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
          path="/notifications"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notification />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
          <Route
          path="/friends"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <Friends />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            authUser && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
