import Field from "./Field";

export default function StepPersonal({ formData, updateField, errors }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="First Name" value={formData.firstName} onChange={(v) => updateField("firstName", v)} error={errors.firstName} />
      <Field label="Last Name" value={formData.lastName} onChange={(v) => updateField("lastName", v)} error={errors.lastName} />
      <Field label="Email Address" type="email" value={formData.email} onChange={(v) => updateField("email", v)} error={errors.email} />
      <Field label="Phone Number" value={formData.phone} onChange={(v) => updateField("phone", v)} error={errors.phone} />
    </div>
  );
}