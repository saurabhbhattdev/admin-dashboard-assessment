import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  PlayCircle,
  User,
  Calendar,
  Layers
} from "lucide-react";

import { projectsData } from "../data/mockData";

export default function ProjectDetail() {
  const { id } = useParams();

  const project = projectsData.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="wiz-glass flex min-h-[50vh] flex-col items-center justify-center rounded-3xl text-slate-400">
        <Layers size={48} className="mb-4 opacity-20" />
        <p className="wiz-heading text-xl">Project not found</p>
        <Link to="/projects" className="mt-4 text-cyan-400 hover:underline">Return to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 lg:space-y-8">
      {/* Back Button */}
      <Link
        to="/projects"
        className="group inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-cyan-400"
      >
        <ArrowLeft size={14} className="mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Portfolio
      </Link>

      {/* Main Card */}
      <div className="wiz-glass overflow-hidden rounded-[2.5rem] shadow-2xl sm:rounded-[3rem]">
        
        {/* Top Header Section */}
        <div className="border-b border-white/5 bg-white/2 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tighter text-cyan-400 ring-1 ring-cyan-500/20">
                  Project #{project.id}
                </span>
              </div>
              <h1 className="wiz-heading text-3xl text-white sm:text-4xl md:text-5xl">
                {project.projectName}
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Enterprise Project Lifecycle & Strategic Overview
              </p>
            </div>

            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          
          {/* Left Side: Info & Details */}
          <div className="space-y-10 p-8 md:p-12">
            
            {/* Description */}
            <div>
              <h3 className="wiz-heading mb-4 flex items-center gap-2 text-lg text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Project Overview
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
            </div>

            {/* Ownership Meta */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <User size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Project Owner</span>
                </div>
                <p className="text-sm font-bold text-slate-200">{project.owner}</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Calendar size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Commencement</span>
                </div>
                <p className="text-sm font-bold text-slate-200">{project.startDate}</p>
              </div>
            </div>

            {/* Related Stakeholders */}
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Assigned Stakeholders
              </p>
              <div className="flex flex-wrap gap-2">
                {project.relatedUsers.map((user) => (
                  <span
                    key={user}
                    className="rounded-xl border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-500/30 hover:text-white"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Timeline */}
          <div className="border-l border-white/5 bg-white/1 p-8 md:p-12">
            <h3 className="wiz-heading mb-8 flex items-center gap-2 text-lg text-white">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Status Timeline
            </h3>

            <div className="relative space-y-8 before:absolute before:left-4.75 before:top-2 before:h-[calc(100%-24px)] before:w-[1px] before:bg-white/10">
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
    <CheckCircle2 className="text-emerald-400" size={18} />
  ) : isCurrent ? (
    <Clock className="text-amber-400" size={18} />
  ) : (
    <PlayCircle className="text-slate-600" size={18} />
  );

  return (
    <div className="relative z-10 flex items-start">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#080E1A] ${
          isCurrent ? "ring-4 ring-amber-500/10 border border-amber-500/20" : "border border-white/5"
        }`}
      >
        {icon}
      </div>

      <div className="ml-5">
        <p className={`text-sm font-bold ${isCurrent ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-500"}`}>
          {title}
        </p>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">
          {isCurrent ? "Current Stage" : isCompleted ? "Phase Completed" : "Pending Phase"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Progress": "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20",
    Completed: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    "On Hold": "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest ${
        styles[status] || "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
          status === "In Progress" ? "bg-cyan-400" :
          status === "Completed" ? "bg-emerald-400" :
          status === "Pending" ? "bg-amber-400" : "bg-rose-400"
        }`} 
      />
      {status}
    </span>
  );
}