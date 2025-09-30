import { readFileSync } from 'fs';

// Load JSON manually instead of using import assert
const skills = JSON.parse(
  readFileSync(new URL('./skills.json', import.meta.url), 'utf-8')
);
const normalizeText = s => (s||'').toLowerCase().match(/\b\w+\b/g) || '';

export function extractSkills(jobDescription) {
    const normalizedJobDesc = normalizeText(jobDescription);
    return {
        hard: skills.hard.filter(skill => normalizedJobDesc.includes(skill)),
        soft: skills.soft.filter(skill => normalizedJobDesc.includes(skill))
    };
}

export function matchSkills(jobSkills,resumeText) {
    const normalizedResume = normalizeText(resumeText);
    const hardWeight = 2;
    const softWeight = 1;

    const hardMatches = jobSkills.hard.filter(skill => normalizedResume.includes(skill));
    const softMatches = jobSkills.soft.filter(skill => normalizedResume.includes(skill));

    const hardMissing = jobSkills.hard.filter(skill => !normalizedResume.includes(skill));
    const softMissing = jobSkills.soft.filter(skill => !normalizedResume.includes(skill));

    const jobWeight = jobSkills.hard.length * hardWeight + jobSkills.soft.length * softWeight || 1;
    const userWeight = hardMatches.length * hardWeight + softMatches.length * softWeight;

    return {
        score: Math.round((userWeight / jobWeight) * 100),
        matchedSkills: { hard: hardMatches, soft: softMatches },
        missingSkills: { hard: hardMissing, soft: softMissing },
    };

}