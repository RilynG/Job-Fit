import express from 'express';
import cors from 'cors';
import { extractSkills, matchSkills } from './srs/core.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'Server is healthy' });
});

app.post('/score', (req, res) => {
    const jobDescription = req.body.jobDescription || '';
    const resumeText = (req.body.resumeText || '').trim();
    if (!jobDescription || !resumeText) {
        return res.status(400).json({ error: 'jobDescription and resumeText are required' });
    }

    const SAFE = 50000; // 50k characters limit
    const jobSkills = extractSkills(jobDescription.slice(0, SAFE));
    const result = matchSkills(jobSkills, resumeText.slice(0, SAFE));
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});