import { Bell, LogOut, Send } from "lucide-react";
import { useLocation, Link } from "react-router";
import { useLogout } from "../../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";
import useAuthUser from "../../hooks/useAuthUser";

const Navbar = () => {
  const { LogoutMutation } = useLogout();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { authUser } = useAuthUser();

  const handleLogout = () => {
    LogoutMutation();
  };

  return (
    <div className="navbar bg-base-100 px-0">
      <div className="flex-1">
        {isChatPage && (
          <Link to="/" className="flex items-center gap-2 px-2">
            <Send className="text-primary" size={24} />
            <h1 className="text-xl font-bold text-primary tracking-tight">
              Konnect
            </h1>
          </Link>
        )}
      </div>

      <div className="flex gap-4">
        <button className="btn btn-ghost btn-circle text-base-content">
          <div className="indicator">
            <Bell size={20} />
          </div>
        </button>

        <ThemeSelector />

        <div className="avatar">
          <div className="w-10 rounded-full border border-blue-400 flex justify-center items-center">
            <img src={authUser?.avatar} alt="User" />
            {/* <p>{authUser?.fullName.charAt(0).toUpperCase()}</p> */}
          </div>
        </div>

        <button
          className="btn btn-ghost btn-circle text-base-content"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
