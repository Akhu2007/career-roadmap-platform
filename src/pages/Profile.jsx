import { useState } from "react";
import "../css/Profile.css";

function Profile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume first");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Resume uploaded successfully!");
        setSkills(data.skills);
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <section className="profile-header">
        <div className="profile-avatar">A</div>

        <div className="profile-info">
          <h1>Akhilesh Kumar</h1>
          <p>B.Tech Computer Science Engineering</p>
          <span>Chitkara University, Himachal Pradesh</span>
        </div>

        <div className="profile-status">
          <span className="status-dot"></span>
          Profile Active
        </div>
      </section>

      {/* Main Content */}
      <div className="profile-grid">
        {/* Personal Information */}
        <section className="profile-card">
          <div className="card-heading">
            <div className="heading-icon">👤</div>

            <div>
              <h2>Personal Information</h2>
              <p>Your basic profile details</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <strong>Akhilesh Kumar</strong>
            </div>

            <div className="info-item">
              <label>Email</label>
              <strong>akhilesh@gmail.com</strong>
            </div>

            <div className="info-item">
              <label>Education</label>
              <strong>B.Tech CSE</strong>
            </div>

            <div className="info-item">
              <label>University</label>
              <strong>Chitkara University</strong>
            </div>
          </div>
        </section>

        {/* Resume Upload */}
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

            <h3>{file ? file.name : "Upload your resume"}</h3>

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

        {/* Skills Section */}
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
              {skills.map((skill, index) => (
                <div className="skill-chip" key={index}>
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

        {/* Career Readiness Preview */}
        <section className="readiness-card">
          <div className="card-heading">
            <div className="heading-icon">📈</div>

            <div>
              <h2>Career Readiness</h2>
              <p>Your personalized career analysis</p>
            </div>
          </div>

          <div className="readiness-content">
            <div className="readiness-circle">
              <span>--</span>
              <small>Score</small>
            </div>

            <div className="readiness-text">
              <h3>Analysis coming next 🚀</h3>

              <p>
                We'll compare your skills with your target career requirements
                and calculate your readiness score.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
