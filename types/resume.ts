import { z } from "zod";

export const KeywordSchema = z.object({
  keyword: z.string(),
  category: z.enum([
    "skill",
    "tool",
    "framework",
    "domain",
    "responsibility",
    "soft-skill",
  ]),
  priority: z.enum(["must", "should", "nice"]),
});

export const ResumeSchema = z.object({
  name: z.string(),
  headline: z.string(),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  summary: z.string(),
  skills: z.array(z.string()).max(18),
  experience: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string(),
        bullets: z.array(z.string()).max(5),
      }),
    )
    .max(4),
  projects: z
    .array(
      z.object({
        name: z.string(),
        dates: z.string().optional(),
        bullets: z.array(z.string()).max(4),
      }),
    )
    .max(4),
  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        dates: z.string().optional(),
      }),
    )
    .max(3),
});

export const CoverLetterSchema = z.object({
  opening: z.string(),
  body: z.array(z.string()).max(3),
  closing: z.string(),
});

export const AnalysisSchema = z.object({
  job: z.object({
    title: z.string(),
    company: z.string(),
    summary: z.string(),
  }),
  keywords: z.array(KeywordSchema).max(40),
  priorities: z.array(z.string()).max(10),
  truthful_additions: z.array(z.string()).max(20),
  resume: ResumeSchema,
  coverLetter: CoverLetterSchema,
  notes: z.array(z.string()).max(8),
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;
export type ResumeDocument = z.infer<typeof ResumeSchema>;
export type CoverLetterDocument = z.infer<typeof CoverLetterSchema>;
