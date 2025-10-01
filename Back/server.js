import express from 'express';
import cors from 'cors';
import { extractSkills, matchSkills } from './srs/core.js';
import { readResumeFile } from './srs/fileReader.js';
import multer from 'multer';
import fs from 'fs';


const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'Server is healthy' });
});

app.post('/score', upload.single('resumeFile'), async (req, res) => {
    try {
        const jobDescription = (req.body.jobDescription || '').trim();
        let resumeText = (req.body.resumeText || '').trim();
    
    if (!jobDescription) return res.status(400).json({ error: 'jobDescription is required' });

    if (!resumeText && req.file) {
        resumeText = (await readResumeFile(req.file)).trim();
    }
    if (req.file) {
    fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
    });
}

    if (!resumeText) return res.status(400).json({ error: 'Either resumeText or resumeFile is required' });

    const SAFE = 50000; // 50k characters limit
    const jobSkills = extractSkills(jobDescription.slice(0, SAFE));
    const result = matchSkills(jobSkills, resumeText.slice(0, SAFE));

    res.json(result);
} catch (error) {
    console.error('Error processing /score request:', error);
    res.status(500).json({ error: 'failed it is stuck here to parse' });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});