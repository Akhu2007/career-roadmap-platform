const getOpportunities = async (req, res) => {
  try {
    const career = req.query.career || "MERN Stack Developer";

    const careerKeywords = {
      "MERN Stack Developer": "react node javascript",
      "Java Developer": "java developer",
      "Frontend Developer": "frontend react javascript",
    };

    const keyword = careerKeywords[career] || "software developer";

    const url = `https://himalayas.app/jobs/api/search?q=${encodeURIComponent(
      keyword,
    )}&limit=20`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch opportunities");
    }

    const data = await response.json();

    const opportunities = (data.jobs || []).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.companyName || "Company",
      location: job.locationRestrictions?.join(", ") || "Remote",
      type: job.employmentType || "Job",
      skills: job.categories || [],
      link: job.applicationLink || job.guid,
      career,
    }));

    res.status(200).json({
      career,
      opportunities,
    });
  } catch (error) {
    console.log("Opportunity API error:", error);

    res.status(500).json({
      message: "Unable to fetch opportunities",
    });
  }
};

module.exports = {
  getOpportunities,
};
