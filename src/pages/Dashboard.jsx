import React from "react";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";
function Dashboard() {
  const name = localStorage.getItem("userName") || "User";
  const career = localStorage.getItem("targetCareer") | "MERN STack Developer";
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <section className="dashboard-welcome">
          <div>
            <h1>Welcome Akhilesh</h1>
            <p>Track your career progress and build the skills you need</p>
          </div>
          {/* welcome */}
          <div className="dashboard-career">
            <span>Target Career</span>
            <strong>MERN Stack Developer</strong>
          </div>
        </section>

        {/* stats */}

        <section className="dashboard-stats">
          <div className="dashboard-card">
            <div className="dashboard-icon">📊</div>
            <div>
              <p>Readiness Score</p>
              <h2>70%</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">✅</div>
            <div>
              <p>Matched Skills</p>
              <h2>7</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📚</div>
            <div>
              <p>Missing Skills</p>
              <h2>3</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">🚀</div>
            <div>
              <p>Career Goal</p>
              <h2>MERN</h2>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Your Skills</h2>
              <p>Skills detected from your resume</p>
            </div>
          </div>

          <div className="dashboard-skills">
            <span>✓ HTML</span>
            <span>✓ CSS</span>
            <span>✓ JavaScript</span>
            <span>✓ React</span>
            <span>✓ MongoDB</span>
            <span>✓ Git</span>
            <span>✓ GitHub</span>
          </div>
        </section>

        {/* Progress */}
        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Career Progress</h2>
              <p>Your progress towards becoming a MERN Developer</p>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <div className="progress-info">
            <span>7 of 10 skills matched</span>
            <strong>70%</strong>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-actions">
          <div className="action-card">
            <div className="action-icon">🗺️</div>
            <div>
              <h3>Career Roadmap</h3>
              <p>Follow a personalized learning path.</p>
            </div>
            <button>View Roadmap →</button>
          </div>

          <div className="action-card">
            <div className="action-icon">💼</div>
            <div>
              <h3>Opportunities</h3>
              <p>Explore internships and job opportunities.</p>
            </div>
            <button>Explore Jobs →</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
