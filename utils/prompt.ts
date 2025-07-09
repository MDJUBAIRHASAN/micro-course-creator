export function buildLessonPrompt(topic: string, index: number, total: number) {
  return `You are an expert educator. Create lesson ${index} of ${total} on "${topic}":
1. Title
2. ~150-200 word lesson text
3. 3-5 multiple-choice questions (one correct answer, with answer key)
4. One-sentence summary
`;
}
