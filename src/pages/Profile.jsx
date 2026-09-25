import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Profile.css";

function Profile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [career, setCareer] = useState("");

  const [analysis, setAnalysis] = useState({
    matchedSkills: [],
    missingSkills: [],
    readinessScore: 0,
  });

  const [user, setUser] = useState(null);

  // =========================
  // FETCH USER FROM MONGODB
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const userData = data.user;

          // Save complete user
          setUser(userData);

          // Career
          setCareer(userData.careerGoal || "");

          // Skills from MongoDB
          setSkills(userData.skills || []);

          // Analysis from MongoDB
          setAnalysis({
            matchedSkills: userData.matchedSkills || [],
            missingSkills: userData.missingSkills || [],
            readinessScore: userData.readinessScore || 0,
          });
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // FILE CHANGE
  // =========================

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  // =========================
  // RESUME UPLOAD
  // =========================

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume first");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const data = await response.json();

      console.log("Resume analysis:", data);

      if (response.ok) {
        setMessage("Resume analyzed successfully!");

        // Update skills
        setSkills(data.skills || []);

        // Update analysis
        if (data.analysis) {
          setAnalysis({
            matchedSkills: data.analysis.matchedSkills || [],
            missingSkills: data.analysis.missingSkills || [],
            readinessScore: data.analysis.readinessScore || 0,
          });
        }

        // Remove selected file after successful upload
        setFile(null);
      } else {
        setMessage(data.message || "Resume analysis failed");
      }
    } catch (error) {
      console.log(error);

      setMessage("Server error. Please try again.");
    }
  };

  // =========================
  // CHANGE CAREER
  // =========================

  const handleCareerChange = async (e) => {
    const selectedCareer = e.target.value;

    setCareer(selectedCareer);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/users/career", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          careerGoal: selectedCareer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      console.log("Career saved:", data.user.careerGoal);

      /*
        Important:

        Changing career means the previous readiness
        score may no longer be valid.

        We will recalculate it when the resume
        is uploaded again.
      */

      setAnalysis({
        matchedSkills: [],
        missingSkills: [],
        readinessScore: 0,
      });
    } catch (error) {
      console.log("Error saving career:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        {/* =========================
            PROFILE HEADER
        ========================= */}

        <section className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-info">
            <h1>{user?.name || "User"}</h1>

            <p>B.Tech Computer Science Engineering</p>

            <span>{user?.college || "College information not added"}</span>
          </div>

          <div className="profile-status">
            <span className="status-dot"></span>
            Profile Active
          </div>
        </section>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="profile-grid">
          {/* =========================
              CAREER
          ========================= */}

          <section className="career-card">
            <div className="card-heading">
              <div className="heading-icon">🎯</div>

              <div>
                <h2>Target Career</h2>

                <p>Choose the career you want to prepare for</p>
              </div>
            </div>

            <select
              value={career}
              onChange={handleCareerChange}
              className="career-select"
            >
              <option value="">Select Career</option>

              <option value="MERN Stack Developer">MERN Stack Developer</option>

              <option value="Java Developer">Java Developer</option>

              <option value="Frontend Developer">Frontend Developer</option>
            </select>
          </section>

          {/* =========================
              RESUME
          ========================= */}

          <section className="resume-card">
            <div className="card-heading">
              <div className="heading-icon resume-icon">📄</div>

              <div>
                <h2>Resume</h2>

                <p>Upload your latest resume</p>
              </div>
            </div>

            <div className="upload-area">
              <div className="upload-icon">↑</div>

              <h3>
                {file
                  ? file.name
                  : user?.resume
                    ? "Resume uploaded"
                    : "Upload your resume"}
              </h3>

              <p>PDF format recommended • Maximum size 5MB</p>

              <label className="choose-file">
                Choose Resume
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  hidden
                />
              </label>

              {file && (
                <button className="upload-button" onClick={handleUpload}>
                  Upload Resume
                </button>
              )}
            </div>

            {message && (
              <div
                className={
                  message.includes("successfully")
                    ? "success-message"
                    : "error-message"
                }
              >
                {message.includes("successfully") ? "✓" : "!"}

                {message}
              </div>
            )}
          </section>

          {/* =========================
              DETECTED SKILLS
          ========================= */}

          <section className="skills-card">
            <div className="card-heading">
              <div className="heading-icon skill-icon">⚡</div>

              <div>
                <h2>Detected Skills</h2>

                <p>Skills automatically extracted from your resume</p>
              </div>

              <div className="skill-count">{skills.length}</div>
            </div>

            {skills.length > 0 ? (
              <div className="skills-container">
                {skills.map((skill) => (
                  <div className="skill-chip" key={skill}>
                    <span>✓</span>

                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-skills">
                <div>✨</div>

                <h3>No skills detected yet</h3>

                <p>
                  Upload your resume and we'll automatically identify your
                  technical skills.
                </p>
              </div>
            )}
          </section>

          {/* =========================
              CAREER ANALYSIS
          ========================= */}

          <section className="skills-card">
            <div className="card-heading">
              <div className="heading-icon">🎯</div>

              <div>
                <h2>Career Skill Analysis</h2>

                <p>Skills compared with your target career</p>
              </div>
            </div>

            <h3>Matched Skills</h3>

            <div className="skills-container">
              {analysis.matchedSkills.length > 0 ? (
                analysis.matchedSkills.map((skill) => (
                  <div className="skill-chip" key={skill}>
                    <span>✓</span>
                    {skill}
                  </div>
                ))
              ) : (
                <p>No matched skills yet.</p>
              )}
            </div>

            <h3>Missing Skills</h3>

            <div className="skills-container">
              {analysis.missingSkills.length > 0 ? (
                analysis.missingSkills.map((skill) => (
                  <div className="skill-chip missing-chip" key={skill}>
                    <span>○</span>
                    {skill}
                  </div>
                ))
              ) : (
                <p>No missing skills.</p>
              )}
            </div>
          </section>

          {/* =========================
              READINESS
          ========================= */}

          <section className="readiness-card">
            <div className="card-heading">
              <div className="heading-icon readiness-icon">📊</div>

              <div>
                <h2>Career Readiness Score</h2>

                <p>
                  See how prepared you are for your target career based on your
                  current skills.
                </p>
              </div>

              <div className="readiness-score">
                <div>{analysis.readinessScore}%</div>
              </div>
            </div>

            <p>
              Your resume matches {analysis.readinessScore}% of the required
              skills for the target career.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Profile;
