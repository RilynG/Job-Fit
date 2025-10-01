



export function tips(result) {
  const { score } = result;
  const messages = [];

  if (score >= 85) {
    messages.push("Excellent match! Your resume aligns well with the job requirements.");
  } else if (score >= 70) {
    messages.push("Good match! Consider highlighting more relevant skills.");
  } else if (score >= 50) {
    messages.push("Fair match. Tailor your resume to better fit the job description.");
  } else {
    messages.push("Poor match. Focus on acquiring and showcasing the required skills.");
  }

  if (result.missingSkills.hard.length) {
  messages.push("Consider learning and adding these technical skills: " + result.missingSkills.hard.join(", "));
}
    if (result.missingSkills.soft.length) {
    messages.push("Consider adding these soft skills: " + result.missingSkills.soft.join(", "));
  }
  

  return messages;
}

