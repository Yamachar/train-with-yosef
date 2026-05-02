"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Days,
  Equipment,
  Experience,
  Goal,
  recommendPlans,
} from "@/lib/recommendation";

const goalOptions: { value: Goal; label: string; note: string }[] = [
  { value: "muscle", label: "Muscle Building", note: "Lean mass and visual physique gains." },
  { value: "fat-loss", label: "Fat Loss", note: "Drop body fat while preserving strength." },
  { value: "strength", label: "Strength & Power", note: "Improve your key lifts and force output." },
  { value: "athletic", label: "Athletic Performance", note: "Move faster, stronger, and more efficiently." },
];

const experienceOptions: { value: Experience; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "returning", label: "Returning After Break" },
];

const dayOptions: { value: Days; label: string }[] = [
  { value: "2-3", label: "2-3 Days / Week" },
  { value: "4-5", label: "4-5 Days / Week" },
  { value: "6+", label: "6+ Days / Week" },
];

const equipmentOptions: { value: Equipment; label: string }[] = [
  { value: "full-gym", label: "Full Gym" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "bodyweight", label: "Bodyweight" },
  { value: "bands", label: "Resistance Bands" },
];

type Answers = {
  goal: Goal | "";
  experience: Experience | "";
  days: Days | "";
  equipment: Equipment[];
};

const totalSteps = 5;

export function StepperRecommender() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    goal: "",
    experience: "",
    days: "",
    equipment: [],
  });

  const recommendation = useMemo(() => {
    if (!answers.goal || !answers.experience || !answers.days || answers.equipment.length === 0) {
      return null;
    }

    return recommendPlans({
      goal: answers.goal,
      experience: answers.experience,
      days: answers.days,
      equipment: answers.equipment,
    });
  }, [answers]);

  const progress = (step / totalSteps) * 100;

  const canContinue =
    (step === 1 && !!answers.goal) ||
    (step === 2 && !!answers.experience) ||
    (step === 3 && !!answers.days) ||
    (step === 4 && answers.equipment.length > 0) ||
    step === 5;

  return (
    <div className="rounded-2xl border border-[#D4AF5A]/30 bg-[#10203b] p-6 text-[#F5F0E8] shadow-2xl md:p-10">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#D4AF5A]">
          <span>Step {step} of 5</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-[#B8952A] via-[#D4AF5A] to-[#B8952A]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      {step === 1 ? (
        <StepGrid
          title="What is your primary goal?"
          items={goalOptions.map((option) => ({
            selected: answers.goal === option.value,
            label: option.label,
            note: option.note,
            onClick: () => setAnswers((prev) => ({ ...prev, goal: option.value })),
          }))}
        />
      ) : null}

      {step === 2 ? (
        <StepGrid
          title="How experienced are you?"
          items={experienceOptions.map((option) => ({
            selected: answers.experience === option.value,
            label: option.label,
            onClick: () => setAnswers((prev) => ({ ...prev, experience: option.value })),
          }))}
        />
      ) : null}

      {step === 3 ? (
        <StepGrid
          title="How many days can you train each week?"
          items={dayOptions.map((option) => ({
            selected: answers.days === option.value,
            label: option.label,
            onClick: () => setAnswers((prev) => ({ ...prev, days: option.value })),
          }))}
        />
      ) : null}

      {step === 4 ? (
        <StepGrid
          title="Which equipment do you have access to?"
          note="Select all that apply"
          items={equipmentOptions.map((option) => ({
            selected: answers.equipment.includes(option.value),
            label: option.label,
            onClick: () => {
              setAnswers((prev) => {
                const hasOption = prev.equipment.includes(option.value);
                return {
                  ...prev,
                  equipment: hasOption
                    ? prev.equipment.filter((item) => item !== option.value)
                    : [...prev.equipment, option.value],
                };
              });
            },
          }))}
        />
      ) : null}

      {step === 5 ? (
        <div>
          <h3 className="heading-font text-5xl text-white">Your Recommended Plan</h3>
          <p className="mt-2 text-sm text-[#c9d3e3]">Based on your answers, this gives you the best progression path.</p>

          {recommendation ? (
            <>
              <article className="mt-6 rounded-xl border border-[#D4AF5A] bg-[#1b2a4a] p-6 shadow-lg">
                <p className="heading-font text-sm text-[#D4AF5A]">Featured Plan</p>
                <h4 className="heading-font mt-1 text-4xl text-white">{recommendation.featured.name}</h4>
                <p className="mt-2 text-sm text-[#F5F0E8]">{recommendation.featured.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#d7dfeb]">
                  <li>{recommendation.featured.cadence}</li>
                  <li>{recommendation.featured.focus}</li>
                </ul>
              </article>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {recommendation.alternatives.map((plan) => (
                  <article key={plan.id} className="rounded-xl border border-white/20 bg-[#15243f] p-5">
                    <h4 className="heading-font text-3xl text-white">{plan.name}</h4>
                    <p className="mt-2 text-sm text-[#d7dfeb]">{plan.summary}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book" className="gold-button rounded-md px-5 py-3 text-sm">
                  Book a Consultation
                </Link>
                <Link href="/plans/1to1" className="outline-gold-button rounded-md px-5 py-3 text-sm">
                  Compare 1-to-1 Plans
                </Link>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(1, value - 1))}
          disabled={step === 1}
          data-testid="stepper-back"
          className={`rounded-md px-5 py-2 text-sm uppercase tracking-[0.1em] ${
            step === 1 ? "cursor-not-allowed text-white/40" : "text-[#F5F0E8] hover:text-[#D4AF5A]"
          }`}
        >
          Back
        </button>

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep((value) => Math.min(totalSteps, value + 1))}
            disabled={!canContinue}
            data-testid="stepper-next"
            className={`rounded-md px-6 py-3 text-sm uppercase tracking-[0.12em] ${
              canContinue
                ? "gold-button"
                : "cursor-not-allowed border border-zinc-500 bg-zinc-700 text-zinc-300"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="outline-gold-button rounded-md px-5 py-3 text-sm uppercase tracking-[0.12em]"
          >
            Start Again
          </button>
        )}
      </div>
    </div>
  );
}

type StepGridProps = {
  title: string;
  note?: string;
  items: {
    selected: boolean;
    label: string;
    note?: string;
    onClick: () => void;
  }[];
};

function StepGrid({ title, note, items }: StepGridProps) {
  return (
    <div>
      <h3 className="heading-font text-5xl text-white">{title}</h3>
      {note ? <p className="mt-2 text-sm text-[#c9d3e3]">{note}</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            data-testid={`option-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className={`rounded-xl border p-5 text-left transition ${
              item.selected
                ? "border-[#D4AF5A] bg-[#B8952A]/15 shadow-[inset_4px_0_0_0_#D4AF5A]"
                : "border-white/15 bg-[#142744] hover:border-[#D4AF5A]/55"
            }`}
          >
            <p className="heading-font text-3xl text-white">{item.label}</p>
            {item.note ? <p className="mt-2 text-sm text-[#d7dfeb]">{item.note}</p> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
