import { LogOut, Send } from "lucide-react";
import { menuItems } from "../../assets/assets";
import useAuthUser from "../../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { useLogout } from "../../hooks/useLogout";

const Sidebar = () => {
  const { LogoutMutation } = useLogout();
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    LogoutMutation();
  };

  return (
    <div className="flex flex-col h-full p-4 bg-base-100 text-base-content">
      <div className="flex items-center gap-2 px-2 mb-10">
        <Send className="text-primary" />
        <h1 className="text-xl font-bold text-primary tracking-tight">
          Konnect
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer transition-all ${
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
        <div className="flex items-center gap-3 px-2">
          <div className="relative">
            {/* <img
              src={authUser?.avatar}
              alt="User"
              className="w-10 h-10 rounded-full bg-base-300"
            /> */}

            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-base-300">
              <p className="font-bold">
                {authUser?.fullName.charAt(0).toUpperCase()}
              </p>
            </div>
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
