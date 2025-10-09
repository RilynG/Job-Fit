import React, { useState } from "react";

const Jobchecker = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let response;
      if (resumeFile) {
        // 🟢 File upload mode
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("resumeFile", resumeFile);

        response = await fetch("https://job-fit-m5sz.onrender.com/score", {
          method: "POST",
          body: formData, // don't set Content-Type, browser will set it
        });
      } else {
        // 🟢 Text mode
        response = await fetch("https://job-fit-m5sz.onrender.com/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription, resumeText }),
        });
      }

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
            Paste a job description and upload your resume (or paste text).
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid gap-6">
          {/* Job Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Paste the job description here…"
            />
          </div>

          {/* Resume Options */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Resume (paste OR upload)
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm mb-2"
              placeholder="Paste your resume text here…"
              disabled={resumeFile !== null} // disable if file chosen
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600"
              disabled={resumeText.length > 0} // disable if text entered
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Checking…" : "Check Match"}
            </button>
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

              <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-indigo-600"
                  style={{ width: `${result.score || 0}%` }}
                />
              </div>

              {/* Skills */}
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div>
                  <h3 className="font-semibold">Matched Skills</h3>
                  <p>Hard: {result.matchedSkills?.hard?.join(", ") || "None"}</p>
                  <p>Soft: {result.matchedSkills?.soft?.join(", ") || "None"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Missing Skills</h3>
                  <p>Hard: {result.missingSkills?.hard?.join(", ") || "None"}</p>
                  <p>Soft: {result.missingSkills?.soft?.join(", ") || "None"}</p>
                </div>
              </div>

              {/* Tips */}
              {result.tips?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold">Tips</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {result.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobchecker;
