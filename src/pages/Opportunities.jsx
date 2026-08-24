import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import opportunities from "../data/opportunities";
import "../css/opportunities.css";

function Opportunities() {
  const [filter, setFilter] = useState("All");
  const career = localStorage.getItem("targetCareer") || "MERN Stack Developer";

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const careerMatch = opportunity.career === career;

    if (filter == "All") {
      return careerMatch;
    }
    return careerMatch && opportunity.type === filter;
  });

  return (
    <>
      <Navbar />

      <div className="opportunities-page">
        <section className="opportunities-hero">
          <span>CAREER OPPORTUNITIES</span>
          <h1>Explore Opportunities</h1>

          <p>Find internships and jobs related to your target career.</p>

          <div className="target-career">
            🎯 Target Career: <strong>{career}</strong>
          </div>
        </section>

        <div className="opportunity-filters">
          <button
            className={filter === "All" ? "active-filter" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Internship" ? "active-filter" : ""}
            onClick={() => setFilter("Internship")}
          >
            Internships
          </button>

          <button
            className={filter === "Job" ? "active-filter" : ""}
            onClick={() => setFilter("Job")}
          >
            Jobs
          </button>
        </div>

        <div className="opportunity-count">
          {filteredOpportunities.length} opportunities found
        </div>

        <div className="opportunity-lists">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <div className="opportunity-card" key={opportunity.id}>
                <div className="opportunity-header">
                  <div className="company-icon">
                    {opportunity.company.charAt(0)}
                  </div>

                  <div>
                    <span className="opportunity-type">{opportunity.type}</span>

                    <h2>{opportunity.title}</h2>

                    <p>{opportunity.company}</p>
                  </div>
                </div>
                <div className="opportunity-location">
                  📍 {opportunity.location}
                </div>

                <div className="opportunity-skills">
                  {opportunity.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <button
                  className="view-opportunity"
                  onClick={() => {
                    window.open(opportunity.link, "_blank");
                  }}
                >
                  View Opportunity →
                </button>
              </div>
            ))
          ) : (
            <div className="no-opportunities">
              <div>🔍</div>

              <h2>No opportunities found</h2>

              <p>
                We couldn't find opportunities for your selected career and
                filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Opportunities;
