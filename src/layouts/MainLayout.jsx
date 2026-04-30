import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardSignature,
  Menu,
  Bell,
  UserCircle,
  ChevronRight,
  Command,
} from "lucide-react";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Clean, standard naming. No "Add User" here.
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Directory", path: "/users", icon: Users },
    { name: "Onboarding", path: "/wizard", icon: ClipboardSignature },
    { name: "Projects", path: "/projects", icon: FolderKanban },
  ];

  const activePath = (path) => location.pathname === path;

  // Simple, human-readable dynamic headers
  const getHeaderText = () => {
    switch (location.pathname) {
      case "/":
        return { eyebrow: "Overview", title: "Dashboard" };
      case "/users":
        return { eyebrow: "Directory", title: "Platform Users" };
      case "/wizard":
        return { eyebrow: "Setup", title: "Onboarding Profile" };
      case "/projects":
        return { eyebrow: "Workspace", title: "Active Projects" };
      default:
        return { eyebrow: "Admin", title: "Control Panel" };
    }
  };

  const headerInfo = getHeaderText();

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#020617]/80 backdrop-blur-sm lg:hidden transition-opacity"
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
        {/* Logo Section */}
        <div className="flex h-24 items-center px-8 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <Command size={20} className="text-slate-900" />
            </div>
            <span className="text-xl font-extrabold uppercase tracking-tight text-white">
              Zenith<span className="font-medium text-cyan-400">Elite</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center justify-between rounded-xl px-5 py-3.5 transition-all duration-200
                  ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <Icon size={20} className={isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300 transition-colors"} />
                  <span className="text-sm font-semibold tracking-wide">
                    {item.name}
                  </span>
                </div>
                {isActive && <ChevronRight size={16} className="text-cyan-400/50" />}
              </Link>
            );
          })}
        </nav>

        {/* System Status Card (Bottom of Sidebar) */}
        <div className="absolute bottom-8 left-6 right-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="mb-2 flex items-center space-x-2.5">
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              System Status
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-300">
            Operational
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        
        {/* Top Header */}
        <header className="flex h-24 shrink-0 items-center justify-between px-6 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md lg:px-12 z-30">
          
          {/* Left Side: Mobile Menu & Dynamic Titles */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="hidden sm:block">
  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-500">
    {headerInfo.eyebrow}
  </p>
  <h2 className="wiz-heading text-2xl text-white font-bold">
    {headerInfo.title}
  </h2>
</div>
          </div>

          {/* Right Side: Notifications & Profile */}
          <div className="flex items-center space-x-5 sm:space-x-8">
            
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/20">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#020617]" />
            </button>

            <div className="flex items-center space-x-4 border-l border-white/10 pl-5 sm:pl-8">
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold text-white">Aryan Sharma</p>
                <p className="text-[11px] font-semibold text-slate-500">
                  Admin
                </p>
              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 transition-transform hover:scale-105">
                <UserCircle size={24} className="text-cyan-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Rendering Area */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}