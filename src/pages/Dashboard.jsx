import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  DollarSign,
  FolderKanban,
  Activity,
  TrendingUp,
  ShieldCheck,
  Server,
  Layers3,
  BriefcaseBusiness,
  LayoutDashboard,
} from "lucide-react";

import {
  kpiData,
  chartData,
  projectDistributionData,
  userRoleData,
} from "../data/mockData";

import Spinner from "../components/Spinner.jsx";

const PIE_COLORS = ["#22d3ee", "#8b5cf6", "#10b981", "#f43f5e"];

const tooltipStyles = {
  contentStyle: {
    backgroundColor: "#080E1A",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    color: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    fontSize: "12px",
    fontWeight: "600",
  },
  wrapperStyle: { outline: "none" },
  cursor: { fill: "rgba(255,255,255,0.03)" },
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner text="Building your dashboard..." />;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "rgba(6,182,212,0.10)", boxShadow: "0 0 0 1px rgba(6,182,212,0.20)" }}
            >
              <LayoutDashboard size={16} className="text-cyan-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Platform Overview
            </span>
          </div>

          <h1 className="wiz-heading leading-none text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
            Command <span style={{ color: "rgb(100 116 139)" }}>Center</span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
            Real-time analytics and strategic insights across your entire ecosystem.
          </p>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KPICard
          title="Total Users"
          value={kpiData.totalUsers}
          icon={<Users size={22} />}
          accent="cyan"
        />
        <KPICard
          title="Revenue"
          value={`$${kpiData.revenue}`}
          icon={<DollarSign size={22} />}
          accent="purple"
        />
        <KPICard
          title="Active Projects"
          value={kpiData.activeProjects}
          icon={<FolderKanban size={22} />}
          accent="emerald"
        />
      </section>

      {/* ── Growth + Executive Summary ── */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="wiz-glass rounded-3xl p-6 lg:col-span-2 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="wiz-heading text-xl text-white">Growth Over Time</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                User growth analytics
              </p>
            </div>
            <Activity className="text-cyan-500 opacity-50" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyles} />
                <Area type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={3} fill="url(#growthGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="wiz-glass rounded-3xl p-6 shadow-2xl">
          <h3 className="wiz-heading mb-8 text-xl text-white">Executive Summary</h3>
          <div className="space-y-3">
            <SummaryItem icon={<TrendingUp size={18} />} label="Monthly Growth" value="+24.8%" color="text-cyan-400" />
            <SummaryItem icon={<ShieldCheck size={18} />} label="System Health" value="98.2%" color="text-emerald-400" />
            <SummaryItem icon={<Server size={18} />} label="Server Load" value="72%" color="text-purple-400" />
            <SummaryItem icon={<Users size={18} />} label="New Users" value="184" color="text-amber-400" />
          </div>
        </div>
      </section>

      {/* ── Bottom Section ── */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="xl:col-span-7 wiz-glass rounded-3xl p-6 shadow-2xl">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="wiz-heading text-xl text-white">Project Distribution</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-purple-400">Department performance</p>
            </div>
            <BriefcaseBusiness size={20} className="text-purple-400" />
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="h-64 xl:col-span-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectDistributionData}>
                  <defs>
                    <linearGradient id="projectBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} />
                  <YAxis stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} />
                  <Tooltip {...tooltipStyles} />
                  <Bar dataKey="projects" fill="url(#projectBarGradient)" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <MiniStatCard title="Categories" value={projectDistributionData.length} icon={<Layers3 size={18} />} color="text-purple-400" />
              <MiniStatCard title="Total Projects" value={projectDistributionData.reduce((acc, item) => acc + item.projects, 0)} icon={<FolderKanban size={18} />} color="text-cyan-400" />
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Peak Performance</p>
                <p className="mt-2 text-xl font-bold text-white">Web Apps</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">Leading output</p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 wiz-glass rounded-3xl p-6 shadow-2xl">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="wiz-heading text-xl text-white">Role Segmentation</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">Workforce distribution</p>
            </div>
            <Users size={20} className="text-cyan-400" />
          </div>

          <div className="relative h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userRoleData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="68%" outerRadius="82%" paddingAngle={5} stroke="none">
                  {userRoleData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyles} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="wiz-heading text-3xl text-white">
                {userRoleData.reduce((acc, role) => acc + role.value, 0)}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Users</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {userRoleData.map((role, index) => (
              <div key={role.name} className="rounded-xl border border-white/5 bg-white/2 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                  <span className="text-xs font-semibold text-slate-400">{role.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{role.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function KPICard({ title, value, icon, accent }) {
  const colors = {
    cyan: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 ring-purple-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  };

  return (
    <div className="wiz-glass group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1">
      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${colors[accent]}`}>
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
      <p className="wiz-card-title mt-1 text-3xl text-white tracking-tight">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

function SummaryItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-4 transition-colors hover:bg-white/[0.07]">
      <div className="flex items-center gap-3">
        <div className={color}>{icon}</div>
        <span className="text-xs font-semibold text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function MiniStatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>{icon}</div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{title}</p>
      </div>
      <span className="text-lg font-bold text-white">{value}</span>
    </div>
  );
}