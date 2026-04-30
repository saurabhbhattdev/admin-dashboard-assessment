import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, FolderKanban } from "lucide-react";

import { projectsData } from "../data/mockData";

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* Eyebrow */}
          <div className="mb-3 flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "rgba(6,182,212,0.10)", boxShadow: "0 0 0 1px rgba(6,182,212,0.20)" }}
            >
              <FolderKanban size={16} className="text-cyan-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Portfolio
            </span>
          </div>

          {/* Heading */}
          <h1 className="wiz-heading leading-none text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
            Active <span style={{ color: "rgb(100 116 139)" }}>Projects</span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
            Track project progress, ownership, and operational timelines.
          </p>
        </div>
      </div>

      {/* ── Empty State ── */}
      {!projectsData?.length ? (
        <div className="wiz-glass flex h-64 flex-col items-center justify-center gap-3 rounded-3xl text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <FolderKanban size={24} className="text-slate-500" />
          </div>
          <h3 className="wiz-heading text-lg text-white">No projects found</h3>
          <p className="text-sm text-slate-500">You currently have no active projects in the portfolio.</p>
        </div>
      ) : (
        /* ── Projects Grid ── */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="wiz-glass group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 sm:p-7"
            >
              <div>
                {/* Top Row: ID & Status */}
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-7 items-center justify-center rounded-lg px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400" style={{ background: "rgba(255,255,255,0.05)" }}>
                    #{project.id}
                  </span>

                  <StatusBadge status={project.status} />
                </div>

                {/* Title */}
                <h3 className="wiz-heading mb-2.5 text-xl text-white sm:text-2xl">
                  {project.projectName}
                </h3>

                {/* Description */}
                <p className="mb-6 line-clamp-3 text-[13px] leading-relaxed text-slate-400">
                  {project.description}
                </p>

                {/* Meta Information */}
                <div className="mb-8 space-y-3 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center text-[13px]">
                    <User size={15} className="mr-3 shrink-0 text-slate-500" />
                    <span className="text-slate-500">
                      Owner: <span className="font-semibold text-slate-200">{project.owner}</span>
                    </span>
                  </div>

                  <div className="flex items-center text-[13px]">
                    <Calendar size={15} className="mr-3 shrink-0 text-slate-500" />
                    <span className="text-slate-500">
                      Start Date: <span className="font-semibold text-slate-200">{project.startDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to={`/projects/${project.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[13px] font-bold text-white transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(6, 182, 212, 0.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Details
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Upgraded Status Badge matching the theme
function StatusBadge({ status }) {
  const styles = {
    "In Progress": "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20",
    Completed: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    "On Hold": "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wider ${
        styles[status] || "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20"
      }`}
    >
      <span 
        className={`h-1.5 w-1.5 rounded-full ${
          status === "In Progress" ? "bg-cyan-400" :
          status === "Completed" ? "bg-emerald-400" :
          status === "Pending" ? "bg-amber-400" :
          status === "On Hold" ? "bg-rose-400" : "bg-slate-400"
        }`} 
      />
      {status}
    </span>
  );
}