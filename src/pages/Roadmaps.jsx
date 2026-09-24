import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import roadmaps from "../data/roadmaps.js";
import "../css/roadmaps.css";

function Roadmaps() {
  const [career, setCareer] = useState("");
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
          setCareer(data.user.careerGoal || "MERN Stack Developer");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error fetching career:", error);
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

  const roadmap = roadmaps[career] || [];

  return (
    <>
      <Navbar />

      <div className="roadmap-page">
        <div className="roadmap-header">
          <p>Your Career Roadmap</p>

          <h2>{career}</h2>

          <span>
            Follow these skills step by step to reach your career goal.
          </span>
        </div>

        <div className="roadmap-list">
          {roadmap.length > 0 ? (
            roadmap.map((skill, index) => (
              <div className="roadmap-step" key={skill}>
                <div className="step-number">{index + 1}</div>

                <div className="step-content">
                  <h2>{skill}</h2>

                  <p>
                    Learn and practice {skill} to build your {career} skills.
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="roadmap-step">
              <div className="step-content">
                <h2>No roadmap available</h2>

                <p>Roadmap for {career} is not available yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Roadmaps;
