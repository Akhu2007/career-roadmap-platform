const analyzeCareer = (userSkills, requiredSkills) => {
  const matchedSkills = requiredSkills.filter((requiredSkill) =>
    userSkills.some(
      (userSkill) =>
        userSkill.trim().toLowerCase() === requiredSkill.trim().toLowerCase(),
    ),
  );

  const missingSkills = requiredSkills.filter(
    (requiredSkill) =>
      !userSkills.some(
        (userSkill) =>
          userSkill.trim().toLowerCase() === requiredSkill.trim().toLowerCase(),
      ),
  );

  const readinessScore =
    requiredSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  return {
    matchedSkills,
    missingSkills,
    readinessScore,
  };
};

module.exports = analyzeCareer;
