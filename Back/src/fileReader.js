import fs from 'fs';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';


export async function readResumeFile(file) {
    if (!file) return '';

    const buf = await fs.promises.readFile(file.path);

    // PDFs
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
        const { text } = await pdfParse(buf);
        return text || '';
    }

    // DOCXs
    const isDocx = file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.originalname.endsWith('.docx');

    if (isDocx) {
        const { value } = await mammoth.extractRawText({ buffer: buf });
        return value || '';
    }   

    return buf.toString('utf-8');
}