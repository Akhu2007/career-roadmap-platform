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
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  const career = user.careerGoal || "No career selected";

  const skills = user.skills || [];

  const matchedSkills = user.matchedSkills || [];

  const missingSkills = user.missingSkills || [];

  const readinessScore = user.readinessScore || 0;

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        {/* Welcome */}
        <section className="dashboard-welcome">
          <div>
            <h1>Welcome {user.name}</h1>

            <p>Track your career progress and build the skills you need</p>
          </div>

          <div className="dashboard-career">
            <span>Target Career</span>

            <strong>{career}</strong>
          </div>
        </section>

        {/* Stats */}
        <section className="dashboard-stats">
          <div className="dashboard-card">
            <div className="dashboard-icon">📊</div>

            <div>
              <p>Readiness Score</p>

              <h2>{readinessScore}%</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">✅</div>

            <div>
              <p>Detected Skills</p>

              <h2>{matchedSkills.length}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📚</div>

            <div>
              <p>Career Goal</p>

              <h2>
                {career === "MERN Stack Developer"
                  ? "MERN"
                  : career === "Java Developer"
                    ? "Java"
                    : "Frontend"}
              </h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">🚀</div>

            <div>
              <p>Resume Status</p>

              <h2>{user.resume ? "Uploaded" : "Pending"}</h2>
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
            {skills.length > 0 ? (
              skills.map((skill) => <span key={skill}>✓ {skill}</span>)
            ) : (
              <p>No skills detected yet. Upload your resume from Profile.</p>
            )}
          </div>
        </section>

        {/* Progress */}
        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Career Progress</h2>

              <p>Your progress towards becoming a {career}</p>
            </div>
          </div>

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

        {/* Quick Actions */}
        <section className="dashboard-actions">
          <div className="action-card">
            <div className="action-icon">🗺️</div>

            <div>
              <h3>Career Roadmap</h3>

              <p>Follow a personalized learning path.</p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/roadmaps";
              }}
            >
              View Roadmap →
            </button>
          </div>

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
