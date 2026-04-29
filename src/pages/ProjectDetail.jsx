import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  PlayCircle,
  User,
  Calendar,
} from "lucide-react";

import { projectsData } from "../data/mockData";

export default function ProjectDetail() {
  const { id } = useParams();

  const project = projectsData.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center rounded-[3rem] border border-white/5 bg-[#0F172A] text-slate-400">
        Project not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-cyan-400"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Projects
      </Link>

      {/* Main Card */}
      <div className="rounded-[3rem] border border-white/5 bg-[#0F172A] p-8 shadow-2xl md:p-12">
        {/* Top Section */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-black text-white">
              {project.projectName}
            </h1>

            <p className="text-slate-400">
              Full enterprise project lifecycle overview
            </p>
          </div>

          <StatusBadge status={project.status} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-8">
            {/* Overview */}
            <div>
              <h3 className="mb-4 border-b border-white/5 pb-3 text-xl font-bold text-white">
                Project Overview
              </h3>

              <p className="leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>

            {/* Owner */}
            <div className="space-y-4">
              <div className="flex items-center text-slate-300">
                <User size={18} className="mr-3 text-cyan-400" />

                <span>
                  Owner:{" "}
                  <span className="font-bold text-white">
                    {project.owner}
                  </span>
                </span>
              </div>

              <div className="flex items-center text-slate-300">
                <Calendar size={18} className="mr-3 text-cyan-400" />

                <span>
                  Start Date:{" "}
                  <span className="font-bold text-white">
                    {project.startDate}
                  </span>
                </span>
              </div>
            </div>

            {/* Related Users */}
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
                Related Users
              </p>

              <div className="flex flex-wrap gap-3">
                {project.relatedUsers.map((user) => (
                  <span
                    key={user}
                    className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Timeline */}
          <div>
            <h3 className="mb-8 border-b border-white/5 pb-3 text-xl font-bold text-white">
              Status Timeline
            </h3>

            <div className="relative space-y-8 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-white/10">
              {project.timeline.map((step, index) => (
                <TimelineItem
                  key={step}
                  title={step}
                  isCompleted={index < project.timeline.length - 1}
                  isCurrent={index === project.timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ title, isCompleted, isCurrent }) {
  const icon = isCompleted ? (
    <CheckCircle2 className="text-emerald-400" size={20} />
  ) : isCurrent ? (
    <Clock className="text-amber-400" size={20} />
  ) : (
    <PlayCircle className="text-cyan-400" size={20} />
  );

  return (
    <div className="relative z-10 flex items-start">
      <div
        className={`rounded-full bg-[#0F172A] p-1 ${
          isCurrent ? "ring-4 ring-amber-500/10" : ""
        }`}
      >
        {icon}
      </div>

      <div className="ml-4">
        <p
          className={`font-bold ${
            isCurrent ? "text-white" : "text-slate-300"
          }`}
        >
          {title}
        </p>

        <p className="text-sm text-slate-500">
          {isCurrent ? "Current Stage" : "Completed"}
        </p>
      </div>
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
      className={`rounded-2xl px-4 py-2 text-sm font-bold uppercase tracking-wider ${
        styles[status] || "bg-white/5 text-white"
      }`}
    >
      {status}
    </span>
  );
}