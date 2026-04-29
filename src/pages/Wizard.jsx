import { useState } from "react";
import { toast } from "sonner";

import {
  TOTAL_STEPS,
  wizardStepTitles,
  initialWizardData,
} from "../data/mockData";

import WizardProgress from "../components/wizard/WizardProgress";
import WizardNavigation from "../components/wizard/WizardNavigation";
import WizardStepHeader from "../components/wizard/WizardStepHeader";
import ReviewCard from "../components/wizard/ReviewCard";
import InputField from "../components/wizard/InputField";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialWizardData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    /* STEP 1 */
    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
    }

    /* STEP 2 */
    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      }

      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "Zip code is required";
      }
    }

    /* STEP 3 */
    if (step === 3) {
      if (!formData.company.trim()) {
        newErrors.company = "Company is required";
      }

      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = "Job title is required";
      }

      if (!formData.experience.trim()) {
        newErrors.experience = "Experience is required";
      }

      if (!formData.department.trim()) {
        newErrors.department = "Department is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      toast.success(
        "Profile submitted successfully!"
      );

      console.log("Submitted Data:", formData);
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-10 sm:px-6 lg:space-y-8 lg:px-8">
      {/* Enterprise Header */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-cyan-500/10 via-[#0F172A] to-purple-500/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Enterprise Candidate System
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Candidate Onboarding Portal
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
            Complete your professional profile through our guided enterprise
            onboarding workflow with step-by-step validation and structured
            submission.
          </p>
        </div>
      </div>

      {/* Progress */}
      <WizardProgress
        step={step}
        totalSteps={TOTAL_STEPS}
        stepTitles={wizardStepTitles}
      />

      {/* Main Form Container */}
      <div className="rounded-[2rem] border border-white/5 bg-[#0F172A] p-5 shadow-2xl sm:p-8 lg:p-10">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <WizardStepHeader
              title="Personal Information"
              description="Provide your core personal identity and communication details."
            />

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <InputField
                label="First Name"
                value={formData.firstName}
                onChange={(value) =>
                  updateField("firstName", value)
                }
                error={errors.firstName}
              />

              <InputField
                label="Last Name"
                value={formData.lastName}
                onChange={(value) =>
                  updateField("lastName", value)
                }
                error={errors.lastName}
              />

              <InputField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                error={errors.email}
              />

              <InputField
                label="Phone Number"
                value={formData.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                error={errors.phone}
              />
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <WizardStepHeader
              title="Address Details"
              description="Enter your residential and geographic information."
            />

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <InputField
                  label="Street Address"
                  value={formData.address}
                  onChange={(value) =>
                    updateField("address", value)
                  }
                  error={errors.address}
                />
              </div>

              <InputField
                label="City"
                value={formData.city}
                onChange={(value) =>
                  updateField("city", value)
                }
                error={errors.city}
              />

              <InputField
                label="State"
                value={formData.state}
                onChange={(value) =>
                  updateField("state", value)
                }
                error={errors.state}
              />

              <InputField
                label="Zip Code"
                value={formData.zipCode}
                onChange={(value) =>
                  updateField("zipCode", value)
                }
                error={errors.zipCode}
              />
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <WizardStepHeader
              title="Professional Information"
              description="Share your employment, expertise, and portfolio details."
            />

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <InputField
                label="Company Name"
                value={formData.company}
                onChange={(value) =>
                  updateField("company", value)
                }
                error={errors.company}
              />

              <InputField
                label="Job Title"
                value={formData.jobTitle}
                onChange={(value) =>
                  updateField("jobTitle", value)
                }
                error={errors.jobTitle}
              />

              <InputField
                label="Years of Experience"
                value={formData.experience}
                onChange={(value) =>
                  updateField("experience", value)
                }
                error={errors.experience}
              />

              <InputField
                label="Department"
                value={formData.department}
                onChange={(value) =>
                  updateField("department", value)
                }
                error={errors.department}
              />

              <InputField
                label="LinkedIn Profile"
                value={formData.linkedIn}
                onChange={(value) =>
                  updateField("linkedIn", value)
                }
              />

              <InputField
                label="Portfolio Website"
                value={formData.portfolio}
                onChange={(value) =>
                  updateField("portfolio", value)
                }
              />
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <WizardStepHeader
              title="Review & Submit"
              description="Review all submitted details carefully before final confirmation."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Object.entries(formData).map(
                ([key, value]) => (
                  <ReviewCard
                    key={key}
                    label={key}
                    value={value}
                  />
                )
              )}
            </div>
          </>
        )}

        {/* Navigation */}
        <WizardNavigation
          step={step}
          totalSteps={TOTAL_STEPS}
          onBack={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}