import type { CareFinderContent } from "@/types/content";

/**
 * A router, not a triage tool, and certainly not a diagnosis.
 *
 * Three rules hold this file honest, and any new branch has to keep all three:
 *
 * 1. **Every option is something a person can say about themselves.** No
 *    symptom clusters, no severity scales, no clinical vocabulary. If an
 *    option would only make sense to someone with medical training, it is the
 *    wrong option.
 * 2. **Every path ends in a place to start, never in a condition.** The
 *    outcome names a service and says "start here" — it never says what is
 *    wrong.
 * 3. **"I'm not sure" is always available**, and it is a real answer that ends
 *    in a phone call rather than a dead end. Most people who open this will
 *    take it, and that is a success.
 *
 * Every path is exactly two questions long, which is what lets the progress
 * line name a total. Adding a third level means `stepCount` moves and the
 * shortest path has to be padded or the total has to become per-branch.
 */
export const careFinder = {
  eyebrow: "Not sure which care you need?",
  heading: "We can help you find the right place to start.",
  lead: "Two questions, in plain words. Nothing you answer is stored, and nothing here is a diagnosis.",
  startLabel: "Help me find care",
  stepCount: 2,
  firstQuestionId: "who",
  questions: [
    {
      id: "who",
      prompt: "Who is this visit for?",
      options: [
        {
          id: "self",
          label: "Myself",
          next: { kind: "question", id: "need-adult" },
        },
        {
          id: "older-adult",
          label: "My parent, or another older adult",
          next: { kind: "question", id: "need-older-adult" },
        },
        {
          id: "family",
          label: "Someone else in my family",
          next: { kind: "question", id: "need-adult" },
        },
      ],
    },
    {
      id: "need-adult",
      prompt: "What would you like help with?",
      help: "Pick whatever sounds closest. You will not be held to it.",
      options: [
        {
          id: "everyday",
          label: "A check-up, an ongoing condition, or something new I noticed",
          next: { kind: "outcome", id: "primary-care" },
        },
        {
          id: "mood",
          label: "Feeling low, anxious, or struggling to cope",
          next: { kind: "outcome", id: "psychology" },
        },
        {
          id: "movement",
          label: "Pain, an injury, or trouble moving around",
          next: { kind: "outcome", id: "physical-therapy" },
        },
        {
          id: "unsure",
          label: "I'm not sure",
          next: { kind: "outcome", id: "unsure" },
        },
      ],
    },
    {
      id: "need-older-adult",
      prompt: "What would you like help with?",
      help: "Pick whatever sounds closest. You will not be held to it.",
      options: [
        {
          id: "general",
          label: "General health, several conditions at once, or their medicines",
          next: { kind: "outcome", id: "geriatric-care" },
        },
        {
          id: "memory",
          label: "Memory, confusion, or a change in how they are behaving",
          next: { kind: "outcome", id: "geriatric-care" },
        },
        {
          id: "mood",
          label: "Mood, grief, anxiety, or feeling isolated",
          next: { kind: "outcome", id: "psychology" },
        },
        {
          id: "movement",
          label: "Pain, falls, balance, or trouble getting around",
          next: { kind: "outcome", id: "physical-therapy" },
        },
        {
          id: "unsure",
          label: "I'm not sure",
          next: { kind: "outcome", id: "unsure" },
        },
      ],
    },
  ],
  outcomes: [
    {
      id: "primary-care",
      title: "Start with Primary Care",
      body: "Primary care is the right first appointment for check-ups, for a condition you already live with, and for anything new you have noticed. If something else turns out to be a better fit, they will arrange it from there.",
      specialtySlug: "primary-care",
    },
    {
      id: "geriatric-care",
      title: "Start with Geriatric Care",
      body: "Our geriatric team looks after older adults whose health does not fit neatly into one appointment — several conditions, a long medicine list, memory, or getting around. You can book on your parent's behalf.",
      specialtySlug: "geriatric-care",
    },
    {
      id: "psychology",
      title: "Start with Psychology",
      body: "You can book with our psychology team directly. You do not need a diagnosis, a referral, or a reason that sounds serious enough.",
      specialtySlug: "psychology",
    },
    {
      id: "physical-therapy",
      title: "Start with Physical Therapy",
      body: "Physical therapy is the right first appointment for pain, for recovering after an injury or an operation, and for feeling unsteady on your feet.",
      specialtySlug: "physical-therapy",
    },
    {
      id: "unsure",
      title: "Give us a call — we will work it out with you",
      body: "Not being sure is the most common reason people call, and it is a fine reason. Describe what is going on in your own words and whoever picks up will find the right appointment for you.",
      specialtySlug: null,
    },
  ],
  labels: {
    back: "Go back",
    restart: "Start over",
    progress: "Step %n of %total",
    resultEyebrow: "Where to start",
    startHereLabel: "The service to ask for",
    callLabel: "Or call the appointment line",
    disclaimer:
      "This is a suggestion about where to start, not medical advice and not a diagnosis. If you are worried, call us and say so.",
    emergencyNote:
      "If this is a medical emergency, stop here and call 911 or go to the nearest emergency department.",
  },
} as const satisfies CareFinderContent;
