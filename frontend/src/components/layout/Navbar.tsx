import { Bell, LogOut, MessageCircle } from "lucide-react";
import { useLocation, Link } from "react-router";
import { useLogout } from "../../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";
import useAuthUser from "../../hooks/useAuthUser";
import UserAvatar from "../ui/UserAvatar";

const Navbar = () => {
  const { LogoutMutation } = useLogout();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { authUser } = useAuthUser();

  const handleLogout = () => {
    LogoutMutation();
  };

  return (
    <div className="navbar min-h-16 bg-transparent px-0">
      <div className="flex-1">
        {isChatPage ? (
          <Link to="/" className="flex items-center gap-2 px-2">
            <MessageCircle className="text-primary" size={21} />
            <h1 className="text-lg font-semibold tracking-tight">Konnect</h1>
          </Link>
        ) : <p className="px-2 text-sm font-medium text-base-content/50">Make a meaningful connection today.</p>}
      </div>

      <div className="flex gap-4">
        <Link
          to="/notifications"
          className="btn btn-ghost btn-circle text-base-content"
        >
          <div className="indicator">
            <Bell size={20} />
          </div>
        </Link>

        <ThemeSelector />

        <UserAvatar name={authUser?.fullName} className="h-10 w-10 text-sm" ring="border border-primary/40" />

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
