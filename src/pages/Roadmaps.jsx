import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import roadmaps from "../data/roadmaps.js";
import "../css/roadmaps.css";

function Roadmaps() {
  const [career, setCareer] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
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
          setCareer(data.user.careerGoal || "");
          setMissingSkills(data.user.missingSkills || []);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error fetching roadmap:", error);
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

        <div className="roadmap-page">
          <h2>Loading roadmap...</h2>
        </div>
      </>
    );
  }

  const fullRoadmap = roadmaps[career] || [];

  // Put missing skills first, while keeping the original roadmap order
  const personalizedRoadmap = [
    ...missingSkills.filter((skill) => fullRoadmap.includes(skill)),
    ...fullRoadmap.filter((skill) => !missingSkills.includes(skill)),
  ];

  return (
    <>
      <Navbar />

      <div className="roadmap-page">
        <div className="roadmap-header">
          <p>Your Personalized Career Roadmap</p>

          <h2>{career || "Career Roadmap"}</h2>

          <span>
            Your roadmap is personalized using the skills detected from your
            resume.
          </span>
        </div>

        {/* Personalized message */}
        <div className="roadmap-summary">
          <h3>🎯 Your Learning Focus</h3>

          {missingSkills.length > 0 ? (
            <p>
              We found <strong>{missingSkills.length}</strong> skills that you
              should focus on for your target career.
            </p>
          ) : (
            <p>
              🎉 No missing skills found. You have covered all the skills in
              this roadmap.
            </p>
          )}
        </div>

        <div className="roadmap-list">
          {personalizedRoadmap.length > 0 ? (
            personalizedRoadmap.map((skill, index) => {
              const isMissing = missingSkills.includes(skill);

              return (
                <div className="roadmap-step" key={skill}>
                  <div className="step-number">{index + 1}</div>

                  <div className="step-content">
                    <div>
                      <h2>{skill}</h2>

                      {isMissing ? (
                        <span className="skill-status">
                          ⚡ Recommended to learn
                        </span>
                      ) : (
                        <span className="skill-status">✓ Already detected</span>
                      )}
                    </div>

                    <p>
                      {isMissing
                        ? `Learn and practice ${skill} to improve your ${career} readiness.`
                        : `You already have ${skill} in your resume. Continue practicing it.`}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="roadmap-step">
              <div className="step-content">
                <h2>No roadmap available</h2>

                <p>
                  Roadmap for {career || "this career"} is not available yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Roadmaps;
