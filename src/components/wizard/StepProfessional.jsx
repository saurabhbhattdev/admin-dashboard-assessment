import Field from "./Field";

export default function StepProfessional({ formData, updateField, errors }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Company Name" value={formData.company} onChange={(v) => updateField("company", v)} error={errors.company} />
      <Field label="Job Title" value={formData.jobTitle} onChange={(v) => updateField("jobTitle", v)} error={errors.jobTitle} />
      <Field label="Years of Experience" value={formData.experience} onChange={(v) => updateField("experience", v)} error={errors.experience} />
      <Field label="Department" value={formData.department} onChange={(v) => updateField("department", v)} error={errors.department} />
      <Field label="LinkedIn Profile" value={formData.linkedIn} onChange={(v) => updateField("linkedIn", v)} optional />
      <Field label="Portfolio Website" value={formData.portfolio} onChange={(v) => updateField("portfolio", v)} optional />
    </div>
  );
}