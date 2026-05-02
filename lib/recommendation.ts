export type Goal = "muscle" | "fat-loss" | "strength" | "athletic";
export type Experience = "beginner" | "intermediate" | "advanced" | "returning";
export type Days = "2-3" | "4-5" | "6+";
export type Equipment = "full-gym" | "dumbbells" | "bodyweight" | "bands";

export type OnlinePlan = {
  id: "foundation" | "performance" | "athlete";
  name: string;
  summary: string;
  cadence: string;
  focus: string;
};

export const onlinePlans: OnlinePlan[] = [
  {
    id: "foundation",
    name: "Foundation Online",
    summary: "Structure, form mastery, and consistency habits.",
    cadence: "Best for 2-3 training days",
    focus: "Technique and baseline strength",
  },
  {
    id: "performance",
    name: "Performance Online",
    summary: "Balanced hypertrophy, conditioning, and nutrition strategy.",
    cadence: "Best for 4-5 training days",
    focus: "Body recomposition and progression",
  },
  {
    id: "athlete",
    name: "Athlete Online",
    summary: "High-frequency progression with advanced periodization.",
    cadence: "Best for 5+ training days",
    focus: "Strength, power, and peak performance",
  },
];

type RecommendationInput = {
  goal: Goal;
  experience: Experience;
  days: Days;
  equipment: Equipment[];
};

export function recommendPlans(input: RecommendationInput): {
  featured: OnlinePlan;
  alternatives: OnlinePlan[];
} {
  const score = new Map<OnlinePlan["id"], number>([
    ["foundation", 0],
    ["performance", 0],
    ["athlete", 0],
  ]);

  const add = (id: OnlinePlan["id"], value: number) => {
    score.set(id, (score.get(id) ?? 0) + value);
  };

  if (input.goal === "muscle") {
    add("performance", 3);
    add("athlete", 2);
  }
  if (input.goal === "fat-loss") {
    add("performance", 3);
    add("foundation", 2);
  }
  if (input.goal === "strength") {
    add("athlete", 4);
    add("performance", 2);
  }
  if (input.goal === "athletic") {
    add("athlete", 3);
    add("performance", 2);
  }

  if (input.experience === "beginner") {
    add("foundation", 4);
  }
  if (input.experience === "returning") {
    add("foundation", 3);
    add("performance", 1);
  }
  if (input.experience === "intermediate") {
    add("performance", 3);
  }
  if (input.experience === "advanced") {
    add("athlete", 4);
  }

  if (input.days === "2-3") {
    add("foundation", 3);
  }
  if (input.days === "4-5") {
    add("performance", 3);
  }
  if (input.days === "6+") {
    add("athlete", 3);
  }

  if (input.equipment.includes("full-gym")) {
    add("athlete", 2);
    add("performance", 2);
  }
  if (input.equipment.includes("dumbbells")) {
    add("performance", 2);
  }
  if (input.equipment.includes("bodyweight")) {
    add("foundation", 2);
  }
  if (input.equipment.includes("bands")) {
    add("foundation", 1);
  }

  const ranked = [...onlinePlans].sort((a, b) => {
    const delta = (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0);
    if (delta !== 0) return delta;
    return a.name.localeCompare(b.name);
  });

  return {
    featured: ranked[0],
    alternatives: ranked.slice(1),
  };
}
