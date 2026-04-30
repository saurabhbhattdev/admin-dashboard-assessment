import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Users as UsersIcon, Plus } from "lucide-react";

import { usersData } from "../data/mockData";
import AddUserModal from "../components/AddUserModal";

const USERS_PER_PAGE = 5;

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
  Inactive: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
  Pending: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
};

const roleStyles = {
  Admin: "bg-violet-500/10 text-violet-400",
  Manager: "bg-cyan-500/10 text-cyan-400",
  Developer: "bg-blue-500/10 text-blue-400",
  Designer: "bg-pink-500/10 text-pink-400",
};

export default function Users() {
  // Logic: usersData ko state mein rakha taaki naya user add ho sake
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    let filtered = [...users]; // usersData ki jagah users state use ho rahi hai

    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return filtered;
  }, [searchTerm, roleFilter, sortOrder, users]); // users dependency add ki hai

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const startEntry = filteredUsers.length === 0 ? 0 : (currentPage - 1) * USERS_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const avatarColors = [
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
  ];

  const getAvatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

  const [searchFocused, setSearchFocused] = useState(false);
  const [roleFocused, setRoleFocused] = useState(false);
  const [sortFocused, setSortFocused] = useState(false);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(6,182,212,0.10)", boxShadow: "0 0 0 1px rgba(6,182,212,0.20)" }}
              >
                <UsersIcon size={16} className="text-cyan-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Platform Directory
              </span>
            </div>

            <h1 className="wiz-heading leading-none text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
              User <span style={{ color: "rgb(100 116 139)" }}>Management</span>
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Manage, filter, and provision your platform users with enterprise-grade controls.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="wiz-btn mt-2 flex h-fit shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white sm:mt-0 sm:self-start"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add User
          </button>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { label: "Total Users", value: users.length, color: "text-white" },
            { label: "Active", value: users.filter((u) => u.status === "Active").length, color: "text-emerald-400" },
            { label: "Inactive", value: users.filter((u) => u.status === "Inactive").length, color: "text-rose-400" },
            { label: "Admins", value: users.filter((u) => u.role === "Admin").length, color: "text-violet-400" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col justify-center rounded-2xl p-4 sm:p-5"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
              <p className={`wiz-heading mt-1.5 ${color}`} style={{ fontSize: "1.875rem" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="wiz-glass grid grid-cols-1 gap-3 rounded-3xl p-4 sm:gap-4 sm:p-5 md:grid-cols-3">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-600 outline-none transition-all"
              style={{
                background: searchFocused ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${searchFocused ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.10)"}`,
                boxShadow: searchFocused ? "0 0 0 3px rgba(6,182,212,0.08)" : "none",
              }}
            />
          </div>

          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              onFocus={() => setRoleFocused(true)}
              onBlur={() => setRoleFocused(false)}
              className="w-full appearance-none rounded-xl px-4 py-3.5 text-sm font-medium text-white outline-none transition-all"
              style={{
                background: roleFocused ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${roleFocused ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.10)"}`,
                boxShadow: roleFocused ? "0 0 0 3px rgba(6,182,212,0.08)" : "none",
              }}
            >
              <option className="bg-[#0C1221]" value="">All Roles</option>
              <option className="bg-[#0C1221]" value="Admin">Admin</option>
              <option className="bg-[#0C1221]" value="Manager">Manager</option>
              <option className="bg-[#0C1221]" value="Developer">Developer</option>
              <option className="bg-[#0C1221]" value="Designer">Designer</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">▼</span>
          </div>

          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              onFocus={() => setSortFocused(true)}
              onBlur={() => setSortFocused(false)}
              className="w-full appearance-none rounded-xl px-4 py-3.5 text-sm font-medium text-white outline-none transition-all"
              style={{
                background: sortFocused ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${sortFocused ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.10)"}`,
                boxShadow: sortFocused ? "0 0 0 3px rgba(6,182,212,0.08)" : "none",
              }}
            >
              <option className="bg-[#0C1221]" value="asc">Name: A → Z</option>
              <option className="bg-[#0C1221]" value="desc">Name: Z → A</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">▼</span>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="wiz-glass overflow-hidden rounded-3xl">
          {paginatedUsers.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead style={{ background: "rgba(255,255,255,0.02)" }}>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-8">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-8">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-8">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-8">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-8">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, idx) => (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-white/3"
                        style={{ borderBottom: idx === paginatedUsers.length - 1 ? "none" : "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <td className="px-6 py-4 sm:px-8">
                          <div className="flex items-center gap-3.5">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${getAvatarColor(user.name)} text-[12px] font-bold text-white shadow-md`}>
                              {getInitials(user.name)}
                            </div>
                            <span className="text-sm font-semibold text-white">{user.name}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-400 sm:px-8">{user.email}</td>

                        <td className="px-6 py-4 sm:px-8">
                          <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[12px] font-semibold ${roleStyles[user.role] || "bg-slate-500/10 text-slate-400"}`}>
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4 sm:px-8">
                          <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-semibold ${statusStyles[user.status] || "bg-slate-500/10 text-slate-400"}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-400" : user.status === "Inactive" ? "bg-rose-400" : "bg-amber-400"}`} />
                            {user.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500 sm:px-8">{user.createdDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row sm:px-8 sm:py-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-sm text-slate-500">
                  Showing <span className="font-semibold text-white">{startEntry}–{endEntry}</span> of <span className="font-semibold text-white">{filteredUsers.length}</span> users
                </p>

                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:px-4 sm:py-2"
                      style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}
                    >
                      <ChevronLeft size={14} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        const isActive = currentPage === page;
                        const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;

                        if (!showPage) {
                          if (page === 2 && currentPage > 4) return <span key={page} className="px-1 text-slate-600">…</span>;
                          if (page === totalPages - 1 && currentPage < totalPages - 3) return <span key={page} className="px-1 text-slate-600">…</span>;
                          return null;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                              isActive ? "wiz-btn text-white" : "text-slate-400"
                            }`}
                            style={!isActive ? { border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" } : {}}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:px-4 sm:py-2"
                      style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <UsersIcon size={24} className="text-slate-500" />
              </div>
              <h3 className="wiz-heading text-lg text-white">No users found</h3>
              <p className="text-sm text-slate-500">Adjust your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        // Logic: Modal ko function pass kar rahe hain list update karne ke liye
        onUserAdded={(newUser) => {
          setUsers(prev => [newUser, ...prev]);
          setCurrentPage(1); // Naya user dikhane ke liye first page par reset
        }}
      />
    </div>
  );
}