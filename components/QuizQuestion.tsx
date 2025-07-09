export default function QuizQuestion({ rawContent }: { rawContent: string }) {
  return (
    <div style={{ marginTop: 8 }}>
      {rawContent
        .split("\n")
        .filter(line => /^[0-9]\./.test(line))
        .map((line, i) => (
          <div key={i}>{line}</div>
        ))}
    </div>
  );
}
