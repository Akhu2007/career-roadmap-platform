const fs = require("fs");
const pdfParse = require("pdf-parse");
const careers = require("../utils/careerData");
const analyzeCareer = require("../utils/careerAnalysis");

const skillList = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Java",
  "Python",
  "C++",
  "SQL",
  "REST APIs",
  "Data Structures and Algorithms",
  "Git",
  "GitHub",
];

const uploadResume = async (req, res) => {
  try {
    const { career } = req.body;
    console.log("Selected Career:", career);

    if (!career || !careers[career]) {
      return res.status(400).json({
        message: "Invalid or missing career",
      });
    }
    console.log(req.file);

    // Read the uploaded PDF
    const pdfBuffer = fs.readFileSync(req.file.path);

    // Extract text from PDF
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text.toLowerCase().replace(/\s+/g, " ");

    const detectedSkills = skillList.filter((skill) => {
      return resumeText.includes(skill.toLowerCase());
    });

    const requiredSkills = careers[career];
    console.log("Selected Career:", career);
    console.log("Required Skills:", requiredSkills);

    const analysis = analyzeCareer(detectedSkills, requiredSkills);

    console.log("========== RESUME TEXT ==========");
    console.log(pdfData.text);
    console.log("=================================");

    console.log("========== DETECTED SKILLS ==========");
    console.log(detectedSkills);

    console.log("========== CAREER ANALYSIS ==========");
    console.log("Required:", requiredSkills);
    console.log("Matched:", analysis.matchedSkills);
    console.log("Missing:", analysis.missingSkills);
    console.log("Score:", analysis.readinessScore);

    res.status(200).json({
      message: "Resume uploaded successfully",
      file: req.file,
      text: pdfData.text,
      skills: detectedSkills,
      career: career,
      analysis: {
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        readinessScore: analysis.readinessScore,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { uploadResume };
