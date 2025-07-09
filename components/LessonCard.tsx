import { useState } from "react";
import QuizQuestion from "./QuizQuestion";

export default function LessonCard({ rawContent }: { rawContent: string }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [title, ...rest] = rawContent.split("\n");
  const body = rest.join("\n");

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, margin: "12px 0" }}>
      <h2>{title}</h2>
      <p style={{ whiteSpace: "pre-line" }}>{body}</p>
      <button onClick={() => setShowQuiz(s => !s)}>
        {showQuiz ? "Hide Quiz" : "Show Quiz"}
      </button>
      {showQuiz && <QuizQuestion rawContent={rawContent} />}
    </div>
  );
}
