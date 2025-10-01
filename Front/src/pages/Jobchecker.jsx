import React from 'react'
import { useState } from "react";




const Jobchecker = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);


    try {
      const response = await fetch("https://job-fit-m5sz.onrender.com/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeText }),
      });


      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Job Fit Checker
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Paste a job description and your resume text to see your match.
          </p>
        </div>
      </header>


      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid gap-6">
          {/* Inputs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Paste the job description here…"
              />
              <button
                type="button"
                onClick={() => setJobDescription("")}
                className="mt-2 self-end text-xs text-red-500 hover:underline"
              >
                Clear
              </button>
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Paste your resume text here…"
              />
              <button
                type="button"
                onClick={() => setResumeText("")}
                className="mt-2 self-end text-xs text-red-500 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>


          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking…" : "Check Match"}
            </button>


            {loading && (
              <span className="text-sm text-gray-500">Analyzing…</span>
            )}
          </div>


          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}


          {/* Results */}
          {result && (
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Results</h2>
                <span className="text-sm text-gray-500">
                  Score: <span className="font-medium">{result.score}%</span>
                </span>
              </div>


              {/* Progress bar */}
              <div className="mb-6">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${result.score || 0}%` }}
                  />
                </div>
              </div>


              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Matched Skills
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Hard:</span>{" "}
                      {result.matchedSkills?.hard?.length
                        ? result.matchedSkills.hard.join(", ")
                        : "None"}
                    </p>
                    <p>
                      <span className="font-medium">Soft:</span>{" "}
                      {result.matchedSkills?.soft?.length
                        ? result.matchedSkills.soft.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>


                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Missing Skills
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Hard:</span>{" "}
                      {result.missingSkills?.hard?.length
                        ? result.missingSkills.hard.join(", ")
                        : "None"}
                    </p>
                    <p>
                      <span className="font-medium">Soft:</span>{" "}
                      {result.missingSkills?.soft?.length
                        ? result.missingSkills.soft.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>
              </div>


              {/* Tips */}
              {result.tips?.length ? (
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Tips
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                    {result.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}


export default Jobchecker