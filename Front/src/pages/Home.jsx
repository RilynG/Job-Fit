import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-700">Job Fit</h1>
        <button
          onClick={() => navigate("/jobchecker")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Try It Now
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Match your resume to your dream job.
        </h2>
        <p className="max-w-lg text-gray-600 mb-8 text-lg">
          Quickly see how your resume aligns with any job posting and get instant feedback to improve your chances.
        </p>
        <button
          onClick={() => navigate("/jobchecker")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t">
        {new Date().getFullYear()} Job Fit.
      </footer>
    </div>
  );
};

export default Home;
