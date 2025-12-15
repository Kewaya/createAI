export type AssessmentQuestionType = "long_text" | "structured_text" | "short_text" | "file_upload";

export type AssessmentSection = {
  id: string;
  title: string;
  purpose: string;
  tier?: "advanced_optional";
  questions: Array<{
    type: AssessmentQuestionType;
    prompt: string;
  }>;
};

export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  {
    id: "ai_fluency",
    title: "AI Fluency",
    purpose: "Evaluate comfort using AI as a work multiplier.",
    questions: [
      {
        type: "long_text",
        prompt:
          "Describe how you personally use AI tools (e.g., ChatGPT) to complete work faster or better. Include a real example and what you had to correct or improve manually.",
      },
    ],
  },
  {
    id: "systems_thinking",
    title: "Systems & Scale Thinking",
    purpose: "Assess ability to reason about workflows at scale.",
    questions: [
      {
        type: "long_text",
        prompt:
          "You are running an online competition with 1,000 participants submitting something daily. Describe a high-level system to collect, log, validate, and notify users about submissions.",
      },
    ],
  },
  {
    id: "discord_architecture",
    title: "Discord Architecture",
    purpose: "Test Discord familiarity and instruction discipline.",
    questions: [
      {
        type: "structured_text",
        prompt:
          "Design a Discord server for a 30-day competition. Constraints: EXACTLY 6 channels, EXACTLY 3 roles, EXACTLY 2 bots. Use the format: Title → Channels → Roles → Bots.",
      },
    ],
  },
  {
    id: "automation_design",
    title: "Automation Design",
    purpose: "Identify automation-first mindset.",
    questions: [
      {
        type: "long_text",
        prompt:
          "Describe one automation you would build to reduce manual work in this competition. Include triggers, tools, and outcomes.",
      },
    ],
  },
  {
    id: "technical_artifact",
    title: "Technical Artifact (Tiered)",
    tier: "advanced_optional",
    purpose: "Differentiate higher technical aptitude candidates.",
    questions: [
      {
        type: "file_upload",
        prompt:
          "Upload a diagram, pseudo-code, workflow screenshot, or document that demonstrates how you would automate or scale part of this competition.",
      },
    ],
  },
  {
    id: "social_execution",
    title: "Social Execution",
    purpose: "Confirm comfort with social posting.",
    questions: [
      {
        type: "short_text",
        prompt:
          "Write two short social posts (Twitter/X or Instagram) encouraging people to join a Discord competition. Include a clear CTA.",
      },
    ],
  },
];


