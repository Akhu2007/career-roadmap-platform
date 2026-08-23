import React from "react";
import Navbar from "../components/Navbar";
import roadmaps from "../data/roadmaps.js";
import "../css/roadmaps.css";

function Roadmaps() {
  const career = localStorage.getItem("targetCareer") || "MERN Stack Developer";

  const roadmap = roadmaps[career];
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
          {roadmap.map((skill, index) => (
            <div className="roadmap-step" key={skill}>
              <div className="step-number">{index + 1}</div>

              <div className="step-content">
                <h2>{skill}</h2>
                <p>
                  Learn and practice {skill} to build your {career} skills.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Roadmaps;
