import Field from "./Field";

export default function StepAddress({ formData, updateField, errors }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Street Address" value={formData.address} onChange={(v) => updateField("address", v)} error={errors.address} />
      </div>
      <Field label="City" value={formData.city} onChange={(v) => updateField("city", v)} error={errors.city} />
      <Field label="State" value={formData.state} onChange={(v) => updateField("state", v)} error={errors.state} />
      <Field label="Zip Code" value={formData.zipCode} onChange={(v) => updateField("zipCode", v)} error={errors.zipCode} />
    </div>
  );
}