import "server-only";
import { z } from "zod";

const EnvSchema = z.object({
  AI_PROVIDER: z.enum(["gemini", "openai", "anthropic"]),
  AI_MODEL: z.string().min(1),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  MAX_FILE_MB: z.coerce.number().positive().default(5),
});

export const env = EnvSchema.parse({
  AI_PROVIDER: process.env.AI_PROVIDER,
  AI_MODEL: process.env.AI_MODEL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  MAX_FILE_MB: process.env.MAX_FILE_MB ?? 5,
});
