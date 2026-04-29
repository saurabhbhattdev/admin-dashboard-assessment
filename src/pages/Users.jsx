import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { usersData } from "../data/mockData";

const USERS_PER_PAGE = 5;

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    let filtered = [...usersData];

    // Search
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Role Filter
    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Sorting
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return filtered;
  }, [searchTerm, roleFilter, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            User Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage, filter, and provision platform users.
          </p>
        </div>

        <Link
          to="/users/add"
          className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:scale-105"
        >
          Add User
        </Link>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 rounded-3xl border border-white/5 bg-[#0F172A] p-6 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-2xl border border-white/10 bg-[#1E293B] py-3 pl-12 pr-4 text-sm font-medium text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-500"
          >
            <option className="bg-slate-900 text-white" value="">
              All Roles
            </option>
            <option className="bg-slate-900 text-white" value="Admin">
              Admin
            </option>
            <option className="bg-slate-900 text-white" value="Manager">
              Manager
            </option>
            <option className="bg-slate-900 text-white" value="Developer">
              Developer
            </option>
            <option className="bg-slate-900 text-white" value="Designer">
              Designer
            </option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-500"
          >
            <option className="bg-slate-900 text-white" value="asc">
              Sort A-Z
            </option>
            <option className="bg-slate-900 text-white" value="desc">
              Sort Z-A
            </option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-white/5 bg-[#0F172A]">
        {paginatedUsers.length ? (
          <table className="min-w-full text-left">
            <thead className="border-b border-white/5">
              <tr className="text-sm font-semibold text-slate-400">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {user.createdDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex h-40 items-center justify-center text-slate-400">
            No users found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}