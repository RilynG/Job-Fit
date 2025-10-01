# Job Fit 🎯  

**Job Fit** is a full-stack project (backend in progress, frontend coming soon) that helps job seekers understand how well their resume matches a job description. The app calculates a match percentage, highlights matched/missing skills, and supports both pasted text and file uploads (PDF/DOCX/TXT).  

---

## ✨ Current Features (Backend v0.2.0)
- 📊 **Match Percentage** — compares a job posting and a resume.  
- 🛠️ **Skills Analysis** — matched vs. missing skills (hard vs. soft).  
- 📄 **File Uploads** — upload resumes in PDF, DOCX, or TXT.  
- 🌐 **API Ready** — JSON responses for easy integration with frontend.  

---

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
- [x] Backend skeleton (Express + /health)  
- [x] Paste-only job vs resume scoring  
- [x] File upload parsing (PDF/DOCX/TXT)  
- [ ] Resume tips endpoint  
- [ ] Cover letter generator  
- [ ] Frontend (React) UI  
- [ ] Authentication & saved analyses  
- [ ] Semantic scoring with embeddings  

---

## 👤 Author
**Your Name**  
- LinkedIn: [https://www.linkedin.com/in/rilyn-griffin/](https://www.linkedin.com/in/rilyn-griffin/)  
- Portfolio: [https://rilyngriffin.vercel.app/](https://rilyngriffin.vercel.app/)
