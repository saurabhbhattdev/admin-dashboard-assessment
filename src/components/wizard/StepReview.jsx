import { User, MapPin, Briefcase } from "lucide-react";

export default function StepReview({ formData }) {
  const sections = [
    {
      section: "Personal Information",
      icon: User,
      color: "from-cyan-500 to-blue-500",
      fields: [
        { label: "First Name", value: formData.firstName },
        { label: "Last Name", value: formData.lastName },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
      ],
    },
    {
      section: "Address Details",
      icon: MapPin,
      color: "from-violet-500 to-purple-600",
      fields: [
        { label: "Street Address", value: formData.address },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "Zip Code", value: formData.zipCode },
      ],
    },
    {
      section: "Professional Information",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-600",
      fields: [
        { label: "Company", value: formData.company },
        { label: "Job Title", value: formData.jobTitle },
        { label: "Experience", value: formData.experience },
        { label: "Department", value: formData.department },
        { label: "LinkedIn", value: formData.linkedIn || "—" },
        { label: "Portfolio", value: formData.portfolio || "—" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {sections.map(({ section, icon: SIcon, color, fields }) => (
        <div key={section} className="overflow-hidden rounded-2xl border border-white/8">
          <div className="flex items-center gap-3 px-5 py-3.5 bg-white/4 border-b border-white/7">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
              <SIcon size={13} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-white">{section}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#0C1221]">
            {fields.map(({ label, value }, idx) => (
              <div
                key={label}
                className="px-5 py-4"
                style={{
                  borderBottom: idx < fields.length - (fields.length % 2 === 0 ? 2 : 1) ? "1px solid rgba(255,255,255,0.05)" : "none",
                  borderRight: idx % 2 === 0 && idx < fields.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</p>
                <p className="mt-1 break-all text-sm font-medium text-slate-200">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}