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
    backgroundColor: "#0F172A",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    color: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  wrapperStyle: {
    outline: "none",
  },
  cursor: {
    fill: "rgba(255,255,255,0.03)",
  },
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Spinner text="Loading dashboard intelligence..." />;
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KPICard
          title="Total Users"
          value={kpiData.totalUsers}
          icon={<Users />}
          color="text-cyan-400"
        />

        <KPICard
          title="Revenue"
          value={`$${kpiData.revenue}`}
          icon={<DollarSign />}
          color="text-purple-400"
        />

        <KPICard
          title="Active Projects"
          value={kpiData.activeProjects}
          icon={<FolderKanban />}
          color="text-emerald-400"
        />
      </section>

      {/* Growth + Executive Summary */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6 lg:col-span-2 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Growth Over Time
              </h3>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
                User growth analytics
              </p>
            </div>

            <Activity className="text-cyan-500" />
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="growthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#22d3ee"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                />

                <Tooltip {...tooltipStyles} />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#growthGradient)"
                  activeDot={{
                    r: 4,
                    fill: "#22d3ee",
                    stroke: "#0F172A",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6 shadow-2xl">
          <h3 className="mb-8 text-lg font-bold text-white">
            Executive Summary
          </h3>

          <div className="space-y-4">
            <SummaryItem
              icon={<TrendingUp size={18} />}
              label="Monthly Growth"
              value="+24.8%"
              color="text-cyan-400"
            />

            <SummaryItem
              icon={<ShieldCheck size={18} />}
              label="System Health"
              value="98.2%"
              color="text-emerald-400"
            />

            <SummaryItem
              icon={<Server size={18} />}
              label="Server Load"
              value="72%"
              color="text-purple-400"
            />

            <SummaryItem
              icon={<Users size={18} />}
              label="New Users"
              value="184"
              color="text-amber-400"
            />
          </div>
        </div>
      </section>

      {/* Bottom Enterprise Section */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* FIXED PROJECT DISTRIBUTION */}
        <div className="xl:col-span-7 rounded-3xl border border-white/5 bg-[#0F172A] p-6 shadow-2xl">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Project Distribution
              </h3>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                Department performance
              </p>
            </div>

            <div className="rounded-2xl bg-purple-500/10 p-3">
              <BriefcaseBusiness
                size={20}
                className="text-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Vertical Bottom-Up Chart */}
            <div className="h-[340px] xl:col-span-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectDistributionData}
                  margin={{
                    top: 20,
                    right: 10,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="projectBarGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#a855f7"
                      />
                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip {...tooltipStyles} />

                  <Bar
                    dataKey="projects"
                    fill="url(#projectBarGradient)"
                    radius={[10, 10, 0, 0]}
                    barSize={42}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Side Stats */}
            <div className="space-y-4">
              <MiniStatCard
                title="Categories"
                value={projectDistributionData.length}
                icon={<Layers3 size={18} />}
                color="text-purple-400"
              />

              <MiniStatCard
                title="Total Projects"
                value={projectDistributionData.reduce(
                  (acc, item) => acc + item.projects,
                  0
                )}
                icon={<FolderKanban size={18} />}
                color="text-cyan-400"
              />

              <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-cyan-500/10 p-5">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Highest Volume
                </p>

                <p className="mt-3 text-2xl font-bold text-white">
                  Web Apps
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Leading department output
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="xl:col-span-5 rounded-3xl border border-white/5 bg-[#0F172A] p-6 shadow-2xl">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                User Role Distribution
              </h3>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Workforce segmentation
              </p>
            </div>

            <div className="rounded-2xl bg-cyan-500/10 p-3">
              <Users size={20} className="text-cyan-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="relative h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="64%"
                    outerRadius="74%"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          PIE_COLORS[
                            index % PIE_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip {...tooltipStyles} />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-white">
                  {userRoleData.reduce(
                    (acc, role) => acc + role.value,
                    0
                  )}
                </p>

                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Total Users
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {userRoleData.map((role, index) => (
                <div
                  key={role.name}
                  className="rounded-2xl bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            PIE_COLORS[
                              index % PIE_COLORS.length
                            ],
                        }}
                      />

                      <span className="text-sm font-medium text-slate-300">
                        {role.name}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-white">
                      {role.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function KPICard({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 sm:p-8 transition-all hover:border-white/10">
      <div className={`mb-4 ${color}`}>
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function SummaryItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className={color}>
          {icon}
        </div>

        <span className="text-sm text-slate-300">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold text-white">
        {value}
      </span>
    </div>
  );
}

function MiniStatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className={color}>
          {icon}
        </span>

        <span className="text-lg font-bold text-white">
          {value}
        </span>
      </div>

      <p className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </p>
    </div>
  );
}