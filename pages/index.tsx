import { useState } from "react";
import useSWR from "swr";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";

const fetcher = (url, opts) => fetch(url, opts).then(r => r.json());

export default function Home() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [payload, setPayload] = useState(null);
  const { data } = useSWR(
    payload ? ["/api/generate", payload] : null,
    (url, body) =>
      fetcher(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }),
    { revalidateOnFocus: false }
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Micro‑Course Creator</h1>
      <input
        placeholder="Enter topic"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        style={{ width: "100%", padding: 8, margin: "10px 0" }}
      />
      <label>
        Lessons: {count}
        <input
          type="range"
          min="3"
          max="10"
          value={count}
          onChange={e => setCount(+e.target.value)}
          style={{ width: "100%" }}
        />
      </label>
      <button onClick={() => setPayload({ topic, lessonsCount: count })}>
        Generate
      </button>

      {data?.lessons && (
        <div style={{ marginTop: 20 }}>
          <ProgressBar total={count} />
          {data.lessons.map((lesson, i) => (
            <LessonCard key={i} rawContent={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}
