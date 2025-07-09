import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/openai";
import { buildLessonPrompt } from "../../utils/prompt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST" });

  const { topic, lessonsCount } = req.body;
  const lessons: string[] = [];    
  for (let i = 1; i <= lessonsCount; i++) {
    const prompt = buildLessonPrompt(topic, i, lessonsCount);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });
    lessons.push(completion.choices[0].message.content);
  }
  res.status(200).json({ lessons });
}

