import { useState } from "react";
import { toast } from "sonner";
import { User, MapPin, Briefcase, ClipboardCheck, ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import { TOTAL_STEPS, initialWizardData } from "../data/mockData";

// Import step components
import StepPersonal from "../components/wizard/StepPersonal";
import StepAddress from "../components/wizard/StepAddress";
import StepProfessional from "../components/wizard/StepProfessional";
import StepReview from "../components/wizard/StepReview";

const STEP_META = [
  { icon: User, label: "Personal", description: "Identity & contact", color: "from-cyan-500 to-blue-500" },
  { icon: MapPin, label: "Address", description: "Residential info", color: "from-violet-500 to-purple-600" },
  { icon: Briefcase, label: "Professional", description: "Work & expertise", color: "from-emerald-500 to-teal-600" },
  { icon: ClipboardCheck, label: "Review", description: "Confirm & submit", color: "from-amber-500 to-orange-500" },
];

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialWizardData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentMeta = STEP_META[step - 1];
  const StepIcon = currentMeta.icon;

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!formData.firstName.trim()) e.firstName = "First name is required";
      if (!formData.lastName.trim()) e.lastName = "Last name is required";
      if (!formData.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
      if (!formData.phone.trim()) e.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!formData.address.trim()) e.address = "Address is required";
      if (!formData.city.trim()) e.city = "City is required";
      if (!formData.state.trim()) e.state = "State is required";
      if (!formData.zipCode.trim()) e.zipCode = "Zip code is required";
    }
    if (step === 3) {
      if (!formData.company.trim()) e.company = "Company is required";
      if (!formData.jobTitle.trim()) e.jobTitle = "Job title is required";
      if (!formData.experience.trim()) e.experience = "Experience is required";
      if (!formData.department.trim()) e.department = "Department is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => validateStep() && setStep((p) => Math.min(p + 1, TOTAL_STEPS));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitted(true);
      toast.success("Profile submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
            <CheckCircle2 size={36} className="text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h2 className="wiz-heading text-3xl text-white">You're all set!</h2>
            <p className="text-sm leading-relaxed text-slate-400">Your profile has been submitted. Our team will review and get back to you shortly.</p>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(1); setFormData(initialWizardData); }} className="wiz-btn rounded-2xl px-8 py-3 text-sm font-semibold text-white">Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-6 lg:space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2.5 text-cyan-400">
              <ClipboardCheck size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">Onboarding</span>
            </div>
            <h1 className="wiz-heading leading-none text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
              Candidate <span style={{ color: "rgb(100 116 139)" }}>Profile</span>
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">Complete your professional profile through our step-by-step guided onboarding workflow.</p>
          </div>
          <div className="flex h-fit shrink-0 flex-col items-center justify-center rounded-2xl px-6 py-4 text-center wiz-glass">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Progress</p>
            <p className="wiz-heading mt-1 text-white text-[1.875rem]">{step}<span className="text-xl font-normal text-slate-600">/{TOTAL_STEPS}</span></p>
            <p className="mt-0.5 text-xs text-slate-600">{currentMeta.label}</p>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="wiz-glass rounded-3xl p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {STEP_META.map((meta, i) => (
              <div key={i+1} className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${step === i + 1 ? "bg-white/7 opacity-100 ring-1 ring-white/10" : "opacity-40"}`}>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br ${step >= i + 1 ? meta.color : "from-slate-700 to-slate-800"}`}>
                  {step > i + 1 ? <CheckCircle2 size={15} /> : <meta.icon size={15} />}
                </div>
                <p className="text-xs font-semibold text-white hidden sm:block">{meta.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="wiz-glass overflow-hidden rounded-3xl">
          <div className={`bg-linear-to-r p-px ${currentMeta.color}`}>
            <div className="rounded-t-[calc(1.5rem-1px)] px-6 py-5 sm:px-8 sm:py-6 bg-[#0C1221]">
              <div className="flex items-center gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg ${currentMeta.color}`}>
                  <StepIcon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Step {step} of {TOTAL_STEPS}</p>
                  <h2 className="wiz-heading mt-0.5 text-white text-[clamp(1.2rem,3vw,1.5rem)]">
                    {step === 1 && "Personal Information"}
                    {step === 2 && "Address Details"}
                    {step === 3 && "Professional Information"}
                    {step === 4 && "Review & Submit"}
                  </h2>
                </div>
              </div>
              {/* DESCRIPTION SUBHEADINGS PRESERVED BELOW */}
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {step === 1 && "Provide your core personal identity and communication details."}
                {step === 2 && "Enter your residential and geographic information."}
                {step === 3 && "Share your employment, expertise, and portfolio details."}
                {step === 4 && "Review all submitted details carefully before final confirmation."}
              </p>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-8">
            {step === 1 && <StepPersonal formData={formData} updateField={updateField} errors={errors} />}
            {step === 2 && <StepAddress formData={formData} updateField={updateField} errors={errors} />}
            {step === 3 && <StepProfessional formData={formData} updateField={updateField} errors={errors} />}
            {step === 4 && <StepReview formData={formData} />}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4 sm:px-8 sm:py-5">
            <button onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-20">
              <ChevronLeft size={15} /> Back
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div key={i} className="rounded-full transition-all" style={{ width: step === i + 1 ? "1.5rem" : "0.5rem", height: "0.5rem", background: step === i + 1 ? "#06b6d4" : step > i + 1 ? "rgba(6,182,212,0.35)" : "rgba(255,255,255,0.10)" }} />
              ))}
            </div>
            {step < TOTAL_STEPS ? (
              <button onClick={nextStep} className="wiz-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white">Continue <ChevronRight size={15} /></button>
            ) : (
              <button onClick={handleSubmit} disabled={isSubmitting} className="wiz-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
                {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <><CheckCircle2 size={15} /> Submit Profile</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}