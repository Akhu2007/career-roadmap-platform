const analyzeCareer = (userSkills, requiredSkills) => {
  const normalizedSkills = userSkills.map((skill) => skill.toLowerCase());

  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedSkills.includes(skill.toLowerCase()),
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !normalizedSkills.includes(skill.toLowerCase()),
  );

  const readinessScore = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100,
  );

  return {
    matchedSkills,
    missingSkills,
    readinessScore,
  };
};

module.exports = analyzeCareer;
