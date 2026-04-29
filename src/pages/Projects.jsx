import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

import { projectsData } from "../data/mockData";

export default function Projects() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">
            Projects Portfolio
          </h1>

          <p className="mt-2 text-slate-400">
            Track project progress, ownership, and operational timelines.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {!projectsData?.length ? (
        <div className="flex h-60 items-center justify-center rounded-[3rem] border border-white/5 bg-[#0F172A] text-slate-400">
          No projects available.
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group rounded-[2.5rem] border border-white/5 bg-[#0F172A] p-6 shadow-xl transition-all hover:-translate-y-1 hover:border-cyan-500/20"
            >
              {/* Top Row */}
              <div className="mb-5 flex items-start justify-between">
                <span className="rounded-xl bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
                  #{project.id}
                </span>

                <StatusBadge status={project.status} />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-bold text-white">
                {project.projectName}
              </h3>

              {/* Description */}
              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>

              {/* Meta */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center text-sm text-slate-300">
                  <User size={16} className="mr-3 text-slate-500" />

                  <span>
                    Owner:{" "}
                    <span className="font-semibold text-white">
                      {project.owner}
                    </span>
                  </span>
                </div>

                <div className="flex items-center text-sm text-slate-300">
                  <Calendar size={16} className="mr-3 text-slate-500" />

                  <span>
                    Start Date:{" "}
                    <span className="font-semibold text-white">
                      {project.startDate}
                    </span>
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/projects/${project.id}`}
                className="flex w-full items-center justify-center rounded-2xl bg-white/5 py-3 text-sm font-bold text-white transition-all group-hover:bg-cyan-500 group-hover:text-slate-950"
              >
                View Details
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Progress": "bg-cyan-500/10 text-cyan-400",
    Completed: "bg-emerald-500/10 text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-400",
    "On Hold": "bg-rose-500/10 text-rose-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
        styles[status] || "bg-slate-500/10 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}