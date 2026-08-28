import { z } from "zod";

/**
 * The wire format for `POST /api/chat`.
 *
 * The whole transcript travels on every turn because nothing is stored server
 * side — PLAN.md §5 item 5, no PHI at rest. That makes the body the only place
 * an unbounded payload could enter, so the bounds here are the rate limiter's
 * other half: 12 turns of 1000 characters caps a request at roughly 3k tokens
 * of user text on top of the fixed corpus.
 */
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1000),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(12),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
