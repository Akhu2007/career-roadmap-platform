import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
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
          setUser(data.user);
        } else {
          console.log(data.message);

          // If token is invalid/expired
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="dashboard-page">
          <h2>Loading dashboard...</h2>
        </div>
      </>
    );
  }

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="dashboard-page">
          <h2>Please login to view your dashboard.</h2>
        </div>
      </>
    );
  }

  // =========================
  // USER DATA
  // =========================

  const name = user.name || "User";

  const career = user.careerGoal || "No career selected";

  const skills = user.skills || [];

  const matchedSkills = user.matchedSkills || [];

  const missingSkills = user.missingSkills || [];

  const readinessScore = user.readinessScore || 0;

  const resumeUploaded = Boolean(user.resume);

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        {/* =================================
            WELCOME SECTION
        ================================= */}

        <section className="dashboard-welcome">
          <div>
            <h1>Welcome {name}</h1>

            <p>Track your career progress and build the skills you need.</p>
          </div>

          <div className="dashboard-career">
            <span>Target Career</span>

            <strong>{career}</strong>
          </div>
        </section>

        {/* =================================
            STAT CARDS
        ================================= */}

        <section className="dashboard-stats">
          {/* Readiness */}

          <div className="dashboard-card">
            <div className="dashboard-icon">📊</div>

            <div>
              <p>Readiness Score</p>

              <h2>{readinessScore}%</h2>
            </div>
          </div>

          {/* Detected Skills */}

          <div className="dashboard-card">
            <div className="dashboard-icon">🧠</div>

            <div>
              <p>Detected Skills</p>

              <h2>{skills.length}</h2>
            </div>
          </div>

          {/* Matched Skills */}

          <div className="dashboard-card">
            <div className="dashboard-icon">✅</div>

            <div>
              <p>Matched Skills</p>

              <h2>{matchedSkills.length}</h2>
            </div>
          </div>

          {/* Resume */}

          <div className="dashboard-card">
            <div className="dashboard-icon">📄</div>

            <div>
              <p>Resume Status</p>

              <h2>{resumeUploaded ? "Uploaded" : "Pending"}</h2>
            </div>
          </div>
        </section>

        {/* =================================
            CAREER INFORMATION
        ================================= */}

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Career Overview</h2>

              <p>Your current career preparation status.</p>
            </div>
          </div>

          <div className="career-overview">
            <div className="overview-item">
              <span>Target Career</span>

              <strong>{career}</strong>
            </div>

            <div className="overview-item">
              <span>Detected Skills</span>

              <strong>{skills.length}</strong>
            </div>

            <div className="overview-item">
              <span>Matched Skills</span>

              <strong>{matchedSkills.length}</strong>
            </div>

            <div className="overview-item">
              <span>Missing Skills</span>

              <strong>{missingSkills.length}</strong>
            </div>
          </div>
        </section>

        {/* =================================
            DETECTED SKILLS
        ================================= */}

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Your Skills</h2>

              <p>Skills detected from your resume.</p>
            </div>
          </div>

          <div className="dashboard-skills">
            {skills.length > 0 ? (
              skills.map((skill) => <span key={skill}>✓ {skill}</span>)
            ) : (
              <p>No skills detected yet. Upload your resume from Profile.</p>
            )}
          </div>
        </section>

        {/* =================================
            MATCHED SKILLS
        ================================= */}

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Matched Skills</h2>

              <p>Skills from your resume that match your target career.</p>
            </div>
          </div>

          <div className="dashboard-skills">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => <span key={skill}>✓ {skill}</span>)
            ) : (
              <p>
                No matched skills yet. Upload a resume to analyze your career
                readiness.
              </p>
            )}
          </div>
        </section>

        {/* =================================
            MISSING SKILLS
        ================================= */}

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Missing Skills</h2>

              <p>Skills you still need to learn for your target career.</p>
            </div>
          </div>

          <div className="dashboard-skills">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span key={skill} className="missing-skill">
                  ○ {skill}
                </span>
              ))
            ) : (
              <p>
                {resumeUploaded
                  ? "Great! No missing skills detected."
                  : "Upload your resume to identify missing skills."}
              </p>
            )}
          </div>
        </section>

        {/* =================================
            CAREER PROGRESS
        ================================= */}

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Career Progress</h2>

              <p>Your progress towards becoming a {career}.</p>
            </div>
          </div>

          {/* Progress Bar */}

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${readinessScore}%`,
              }}
            ></div>
          </div>

          <div className="progress-info">
            <span>{readinessScore}% career readiness</span>

            <strong>{readinessScore}%</strong>
          </div>
        </section>

        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <section className="dashboard-actions">
          {/* Roadmap */}

          <div className="action-card">
            <div className="action-icon">🗺️</div>

            <div>
              <h3>Career Roadmap</h3>

              <p>
                Follow a personalized learning path based on your career goal.
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/roadmaps";
              }}
            >
              View Roadmap →
            </button>
          </div>

          {/* Opportunities */}

          <div className="action-card">
            <div className="action-icon">💼</div>

            <div>
              <h3>Opportunities</h3>

              <p>Explore internships and job opportunities.</p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/opportunities";
              }}
            >
              Explore Jobs →
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
