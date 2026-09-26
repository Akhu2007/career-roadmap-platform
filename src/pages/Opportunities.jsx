import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/opportunities.css";

function Opportunities() {
  const [filter, setFilter] = useState("All");
  const [career, setCareer] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user's career
  useEffect(() => {
    const fetchOpportunities = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        // Get current user
        const userResponse = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          setError(userData.message || "Unable to get user");
          setLoading(false);
          return;
        }

        const userCareer = userData.user.careerGoal || "MERN Stack Developer";

        setCareer(userCareer);

        // Get opportunities for selected career
        const opportunityResponse = await fetch(
          `http://localhost:5000/api/opportunities?career=${encodeURIComponent(
            userCareer,
          )}`,
        );

        const opportunityData = await opportunityResponse.json();

        if (!opportunityResponse.ok) {
          setError(opportunityData.message || "Unable to fetch opportunities");
          setLoading(false);
          return;
        }

        setOpportunities(opportunityData.opportunities || []);
      } catch (error) {
        console.log("Opportunity error:", error);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (filter === "All") {
      return true;
    }

    return opportunity.type?.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="opportunities-page">
          <section className="opportunities-hero">
            <span>CAREER OPPORTUNITIES</span>
            <h1>Explore Opportunities</h1>
            <p>Loading live opportunities...</p>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="opportunities-page">
        <section className="opportunities-hero">
          <span>CAREER OPPORTUNITIES</span>

          <h1>Explore Opportunities</h1>

          <p>Find live job opportunities related to your target career.</p>

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

        {error ? (
          <div className="no-opportunities">
            <div>⚠️</div>

            <h2>Unable to load opportunities</h2>

            <p>{error}</p>
          </div>
        ) : (
          <div className="opportunity-lists">
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity) => (
                <div className="opportunity-card" key={opportunity.id}>
                  <div className="opportunity-header">
                    <div className="company-icon">
                      {opportunity.company
                        ? opportunity.company.charAt(0).toUpperCase()
                        : "C"}
                    </div>

                    <div>
                      <span className="opportunity-type">
                        {opportunity.type || "Job"}
                      </span>

                      <h2>{opportunity.title}</h2>

                      <p>{opportunity.company}</p>
                    </div>
                  </div>

                  <div className="opportunity-location">
                    📍 {opportunity.location || "Remote"}
                  </div>

                  <div className="opportunity-skills">
                    {opportunity.skills && opportunity.skills.length > 0 ? (
                      opportunity.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    ) : (
                      <span>Software Development</span>
                    )}
                  </div>

                  <button
                    className="view-opportunity"
                    onClick={() => {
                      window.open(
                        opportunity.link,
                        "_blank",
                        "noopener,noreferrer",
                      );
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
        )}
      </div>
    </>
  );
}

export default Opportunities;
