const fs = require("fs");
const pdfParse = require("pdf-parse");

const careers = require("../utils/careerData");
const analyzeCareer = require("../utils/careerAnalysis");
const User = require("../models/Users");

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
  "OOP",
  "Spring Boot",
];

const uploadResume = async (req, res) => {
  try {
    // Check whether resume was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    // Logged-in user comes from JWT middleware
    const user = req.user;

    console.log("Logged-in user:", user.email);
    console.log("Career goal:", user.careerGoal);

    // Read uploaded PDF
    const pdfBuffer = fs.readFileSync(req.file.path);

    // Extract text from PDF
    const pdfData = await pdfParse(pdfBuffer);

    const resumeText = pdfData.text.toLowerCase().replace(/\s+/g, " ");

    // Detect skills from resume
    const detectedSkills = skillList.filter((skill) => {
      return resumeText.includes(skill.toLowerCase());
    });

    // Get user's selected career
    const careerGoal = user.careerGoal;

    // Check whether career is valid
    if (!careerGoal || !careers[careerGoal]) {
      return res.status(400).json({
        message: "Please select a valid career goal first",
      });
    }

    // Get skills required for selected career
    const requiredSkills = careers[careerGoal];

    // Analyze resume
    const analysis = analyzeCareer(detectedSkills, requiredSkills);

    console.log("========== RESUME ANALYSIS ==========");

    console.log("Career:", careerGoal);

    console.log("Detected Skills:", detectedSkills);

    console.log("Required Skills:", requiredSkills);

    console.log("Matched Skills:", analysis.matchedSkills);

    console.log("Missing Skills:", analysis.missingSkills);

    console.log("Readiness Score:", analysis.readinessScore);

    console.log("====================================");

    // Save resume information to MongoDB
    await User.findByIdAndUpdate(user._id, {
      resume: req.file.filename,
      skills: detectedSkills,
      readinessScore: analysis.readinessScore,
    });

    res.status(200).json({
      message: "Resume analyzed successfully",

      career: careerGoal,

      file: req.file,

      text: pdfData.text,

      skills: detectedSkills,

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

module.exports = {
  uploadResume,
};
