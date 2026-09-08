import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { menuItems } from "../../assets/assets";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const location = useLocation();
  return (
    <div className="app-shell flex h-screen w-full overflow-hidden text-base-content">
      {showSidebar && (
        <aside className="hidden md:flex w-[248px] flex-col border-r border-base-content/10 bg-base-100/70 backdrop-blur-xl">
          <Sidebar />
        </aside>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-[72px] flex items-center px-6 border-b border-base-content/10">
          <Navbar />
        </header>

        <main className="app-main flex-1 overflow-y-auto p-4 pb-24 md:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
      {showSidebar && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-base-content/10 bg-base-100/95 px-3 py-2 backdrop-blur-xl md:hidden">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] ${active ? "bg-primary text-primary-content" : "text-base-content/60"}`}>
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Layout;
