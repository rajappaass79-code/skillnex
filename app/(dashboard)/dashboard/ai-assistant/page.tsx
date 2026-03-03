"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [mode, setMode] = useState("school");
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        formData: { topic, grade },
      }),
    });

    const data = await response.json();
    if (data.success) {
      setResult(data.result);
    } else {
      alert("AI generation failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <h1
        className="text-2xl font-bold mb-6"
        data-testid="text-ai-title"
      >
        SkillNex AI – Teaching Assistant (Beta)
      </h1>

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border p-3 rounded-lg mb-4 w-full max-w-md block"
        data-testid="select-mode"
      >
        <option value="school">School Lesson Plan</option>
        <option value="college">College Lecture</option>
        <option value="coach">Coaching Session</option>
      </select>

      <input
        type="text"
        placeholder="Topic"
        className="border p-3 rounded-lg mb-4 w-full max-w-md block"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        data-testid="input-topic"
      />

      <input
        type="text"
        placeholder="Grade / Audience Level"
        className="border p-3 rounded-lg mb-4 w-full max-w-md block"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        data-testid="input-grade"
      />

      <button
        onClick={generate}
        className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
        data-testid="button-generate"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div
          className="mt-8 p-6 bg-gray-100 rounded-lg whitespace-pre-wrap"
          data-testid="text-result"
        >
          {result}
        </div>
      )}
    </div>
  );
}
