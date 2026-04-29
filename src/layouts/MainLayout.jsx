import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Menu,
  Bell,
  UserCircle,
  ChevronRight,
  Command,
  UserPlus,
} from "lucide-react";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Add User", path: "/users/add", icon: UserPlus },
    { name: "Wizard", path: "/wizard", icon: FileText },
    { name: "Projects", path: "/projects", icon: FolderKanban },
  ];

  const activePath = (path) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#020617]/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 border-r border-white/5
          bg-[#0F172A]/90 backdrop-blur-xl transition-transform duration-300
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-24 items-center px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/20">
              <Command size={22} className="text-slate-950" />
            </div>

            <span className="text-xl font-black uppercase tracking-tight">
              Admin<span className="font-light text-cyan-400">Hub</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center justify-between rounded-2xl px-5 py-4 transition-all
                  ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <Icon size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">
                    {item.name}
                  </span>
                </div>

                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* Status Card */}
        <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/5 bg-white/5 p-6">
          <div className="mb-2 flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Core Status
            </span>
          </div>

          <p className="text-xs font-bold text-white">
            System: Operational
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-24 shrink-0 items-center justify-between px-8 lg:px-12">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-4 rounded-xl bg-white/5 p-3 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="hidden sm:block">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">
                Authenticated / Admin
              </p>

              <h2 className="text-xl font-bold text-white">
                Welcome back, Admin
              </h2>
            </div>
          </div>

          {/* Right Header */}
          <div className="flex items-center space-x-6">
            <button className="relative rounded-2xl bg-white/5 p-3 transition-colors hover:text-cyan-400">
              <Bell size={20} />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
            </button>

            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-[10px] font-bold uppercase text-slate-500">
                  System Manager
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                <UserCircle size={28} className="text-cyan-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 pb-12 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}