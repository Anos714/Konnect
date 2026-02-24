import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-base-100 text-base-content overflow-hidden">
      {showSidebar && (
        <aside className="hidden md:flex w-64 flex-col border-r border-base-300 bg-base-100">
          <Sidebar />
        </aside>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-16 flex items-center px-6 border-b border-base-300">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-200">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
