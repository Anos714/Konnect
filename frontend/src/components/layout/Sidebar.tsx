import { LogOut, Send } from "lucide-react";
import { menuItems } from "../../assets/assets";
import useAuthUser from "../../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { useLogout } from "../../hooks/useLogout";
import UserAvatar from "../ui/UserAvatar";

const Sidebar = () => {
  const { LogoutMutation } = useLogout();
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    LogoutMutation();
  };

  return (
    <div className="flex flex-col h-full p-5 bg-transparent text-base-content">
      <div className="mb-12 flex items-center gap-3 px-2">
        <span className="brand-mark"><Send size={17} /></span>
        <h1 className="text-lg font-semibold tracking-tight">
          Konnect
        </h1>
      </div>

      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all ${
              currentPath === item.path
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-base-300">
        <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/40 p-3">
          <div className="relative">
            <UserAvatar name={authUser?.fullName} className="h-10 w-10 text-sm" />

            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success">Online</p>
          </div>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
