# Job-Fit

🚀 **Job-Fit** is a web application that helps candidates measure how well their resume matches a job description.  
It analyzes skills, computes a match score, highlights gaps, and provides tailored tips for improvement.  

- **Backend:** Node.js + Express API (with PDF/DOCX parsing)  
- **Frontend:** React (Vite) + TailwindCSS UI  
- **Deployed API:** [Render](https://job-fit-m5sz.onrender.com)  
- **Deployed Frontend:** [Vercel](https://job-fit-beta.vercel.app/)

---

## ✨ Features
- Upload or paste your resume text
- Paste job description text
- Backend extracts hard & soft skills
- Weighted scoring algorithm (hard skills > soft skills)
- Evidence array for matched & missing skills
- Tips and improvement suggestions
- Clean frontend UI with progress bar and skill breakdown

## 🛠️ Tech Stack
**Backend**
- Node.js + Express  
- Multer (file uploads)  
- pdf-parse (PDF parsing)  
- mammoth (DOCX parsing)  

**Matching Logic**
- Hard-coded skills (hard vs. soft) in `skills.json`  
- Simple keyword matching (hard = weight 3, soft = weight 1)  
- Future plan: embeddings (OpenAI or sentence-transformers) for semantic matches  

---

## 🗺️ Roadmap
- [x] Stage 0 — Backend server scaffold  
- [x] Stage 1 — Skill extraction logic  
- [x] Stage 2 — Scoring algorithm
- [x] Stage 3 — File upload parsing (PDF/DOCX/TXT)  
- [x] Stage 4 — Tips function  
- [x] Stage 5 — Frontend MVP (Paste Only)  
- [ ] Stage 6 — File uploads on frontend  
- [ ] Stage 7 — Authentication & saved analyses  
- [ ] Stage 8 — Cover letter generator
- [ ] Stage 9 — AI-powered suggestions